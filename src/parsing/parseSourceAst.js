const traverse = require('@babel/traverse').default
const babylon = require('@babel/parser')
const fs = require('fs')
const parseComment = require('./commentParser')


const parsedTypes = {
  class: 'class',
  function: 'function',
  constructor: 'constructor',
  object: 'object',
  unknown: 'unknown'
}

const extractComment = (node) => {
  return node.leadingComments && node.leadingComments[node.leadingComments.length - 1].value
} 

const variableDeclaration = (node, result, comment) => {
  const type = node.declarations[0].init.type

  if (type === 'ArrowFunctionExpression' || type === 'FunctionExpression') {
    functionDeclaration(node.declarations[0], result, comment)
  }
  else if (type === 'ObjectExpression') {
    objectDeclaration(node.declarations[0], result, comment)
  }
  else {
    const name = node.declarations[0].id.name
    result[name] = {
      type: parsedTypes.unknown,
      name: name,
      doc: parseComment(comment)
    }
  }
}

const objectDeclaration = (node, result, comment) => {
  result[node.id.name] = {
    type: parsedTypes.object,
    name: node.id.name,
    doc: parseComment(comment),
    properties: {}
  }
}

const functionDeclaration = (node, result, comment) => {
  result[node.id.name] = {
    type: parsedTypes.function,
    name: node.id.name,
    doc: parseComment(comment)
  }
}

const classDeclaration = (node, result, comment) => {
  result[node.id.name] = {
    type: parsedTypes.class,
    name: node.id.name,
    properties: {},
    doc: parseComment(comment)
  }
}

const classMethod = (node, result, comment, path) => {
  if (node.kind === 'constructor') {
    result[path.parentPath.parent.id.name].constructor = {
      type: parsedTypes.constructor,
      name: path.parentPath.parent.id.name,
      doc: parseComment(comment)
    }
  }
  if (path.node.kind === 'method') {
    result[path.parentPath.parent.id.name].properties[path.node.key.name] = {
      type: parsedTypes.function,
      name: path.node.key.name,
      doc: parseComment(comment)
    }
  }
}

const classProperty = (node, result, comment, path) => {
  const doc = parseComment(comment)
  if (node.value.type === 'ArrowFunctionExpression' || node.value.type === 'FunctionExpression') {
    result[path.parentPath.parent.id.name].properties[path.node.key.name] = {
      type: parsedTypes.function,
      name: node.key.name,
      doc: doc
    }
  }
  else {
    result[path.parentPath.parent.id.name].properties[path.node.key.name] = {
      type: doc.type || parsedTypes.unknown,
      name: node.key.name,
      doc: doc
    }
  }
}

const objectProperty = (node, result, comment, path) => {
  if (!path.parentPath.parent.id) {
    return
  }
  const doc = parseComment(comment)
  result[path.parentPath.parent.id.name].properties[node.key.name] = {
    type: doc.type || '',
    name: node.key.name,
    doc: doc
  }
}

const exportDeclaration = (node, result, comment) => {
  const declaration = node.declaration
  if (declaration.type === 'VariableDeclaration') {
    variableDeclaration(declaration, result, comment)
  }
  if (declaration.type === 'FunctionDeclaration') {
    functionDeclaration(declaration, result, comment)
  }

  if (declaration.type === 'ClassDeclaration') {
    classDeclaration(declaration, result, comment)
  }
}


// The function used to parse the abstract syntax tree for a given example files source.
const parseSourceAst = (exampleFilePath) => {
  const buffer = fs.readFileSync(exampleFilePath).toString()

  const ast = babylon.parse(buffer, {allowImportExportEverywhere: true, plugins: ['classProperties']})

  
  const result = {}

  const parse = (func, node, path) => {
    const comment = extractComment(node)
    if (comment) {
      func(node, result, comment, path)
    }
  }
  
  traverse(ast, {
  
    VariableDeclaration: (path) => parse(variableDeclaration, path.node),
    FunctionDeclaration: (path) => parse(functionDeclaration, path.node),
    ClassDeclaration: (path) => parse(classDeclaration, path.node),
    ClassMethod: (path) => parse(classMethod, path.node, path),
    ClassProperty: (path) => parse(classProperty, path.node, path),
    ObjectProperty: (path) => parse(objectProperty, path.node, path),
    ExportNamedDeclaration: (path) => parse(exportDeclaration, path.node),
    ExportDefaultDeclaration: (path) => parse(exportDeclaration, path.node)
  })
  
  return result
}

module.exports = parseSourceAst