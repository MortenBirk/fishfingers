const glob = require('glob')
const parseAst = require('./parseAst')



// Find all example files.
// TODO: Currently the search directory is hardcoded to test, it should be configurable
const searchDir = process.cwd().replace('\\', '/') + '/test/**/*.example.js'
const examples = glob.sync(searchDir)

// Now for each example parse the AST to extract comment annotations.
examples.forEach(parseAst)