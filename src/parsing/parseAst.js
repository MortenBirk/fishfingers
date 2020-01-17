const traverse = require('@babel/traverse').default
const babylon = require('@babel/parser')
const fs = require('fs')
const parseComment = require('./commentParser')


const parsedTypes = {
  class: 'class',
  function: 'function',
  method: 'method',
  constructor: 'constructor',
  object: 'object',
  unknown: 'unknown'
}

const extractComment = (node) => {
  return node.leadingComments && node.leadingComments[node.leadingComments.length - 1].value
} 

const variableDeclaration = (node, result, comment) => {
  const name = node.declarations[0].id.name
  const type = node.declarations[0].init.type
  result[name] = {
    type: type === 'ArrowFunctionExpression' || type === 'FunctionExpression' ? parsedTypes.function : type === 'ObjectExpression' ? parsedTypes.object : parsedTypes.unknown,
    name: name,
    doc: parseComment(comment)
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
    methods: {},
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
    result[path.parentPath.parent.id.name].methods[path.node.key.name] = {
      type: parsedTypes.method,
      name: path.node.key.name,
      doc: parseComment(comment)
    }
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
}


// The function used to parse the abstract syntax tree for a given example files source.
const parseAst = (exampleFile) => {
  const buffer = fs.readFileSync(exampleFile.replace('.example', '')).toString()

  const ast = babylon.parse(buffer, {allowImportExportEverywhere: true})

  
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
    ExportNamedDeclaration: (path) => parse(exportDeclaration, path.node),
    ExportDefaultDeclaration: (path) => parse(exportDeclaration, path.node)
  })
  
  console.log(result)
  
  fs.writeFile('doc/parsedJson.json', JSON.stringify(result, null, 4), 'utf8', () => {})
}

module.exports = parseAst