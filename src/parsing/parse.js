const babylon = require('@babel/parser')
const traverse = require('@babel/traverse').default
const fs = require('fs')
const parseComment = require('./commentParser')
const glob = require('glob')

// The function used to parse the abstract syntax tree for a given example files source.
const parseAst = (exampleFile) => {
  const buffer = fs.readFileSync(exampleFile.replace('.example', '')).toString()

  const ast = babylon.parse(buffer, {allowImportExportEverywhere: true})
  
  const parsedTypes = {
    class: 'class',
    function: 'function',
    method: 'method',
    constructor: 'constructor',
    object: 'object',
    unknown: 'unknown'
  }
  
  const result = {}
  
  traverse(ast, {
  
    VariableDeclaration: (path) => {
      if (path.node.leadingComments) {
        const name = path.node.declarations[0].id.name
        const type = path.node.declarations[0].init.type
        const comment = path.node.leadingComments[path.node.leadingComments.length - 1].value
        result[name] = {
          type: type === 'ArrowFunctionExpression' || type === 'FunctionExpression' ? parsedTypes.function : type === 'ObjectExpression' ? parsedTypes.object : parsedTypes.unknown,
          name: name,
          doc: parseComment(comment)
        }
      }
    },
  
    FunctionDeclaration: (path) => {
      if (path.node.leadingComments) {
        const comment = path.node.leadingComments[path.node.leadingComments.length - 1].value
        result[path.node.id.name] = {
          type: parsedTypes.function,
          name: path.node.id.name,
          doc: parseComment(comment)
        }
      }
    },
    
    ClassDeclaration: (path) => {
      if (path.node.leadingComments) {
        const comment = path.node.leadingComments[path.node.leadingComments.length - 1].value
        result[path.node.id.name] = {
          type: parsedTypes.class,
          name: path.node.id.name,
          methods: {},
          doc: parseComment(comment)
        }
      }
    },
  
    ClassMethod: (path) => {
      if (path.node.leadingComments) {
        const comment = path.node.leadingComments[path.node.leadingComments.length - 1].value
        if (path.node.kind === 'constructor') {
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
    }
  })
  
  console.log(result)
  
  fs.writeFile('doc/parsedJson.json', JSON.stringify(result, null, 4), 'utf8', () => {})
}


// Find all example files.
// TODO: Currently the search directory is hardcoded to test, it should be configurable
const searchDir = process.cwd().replace('\\', '/') + '/test/**/*.example.js'
const examples = glob.sync(searchDir)

// Now for each example parse the AST to extract comment annotations.
examples.forEach(parseAst)