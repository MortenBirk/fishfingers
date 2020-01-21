const glob = require('glob')
const parseSourceAst = require('./parseSourceAst')
const parseExample = require('./parseExample')
const fs = require('fs')
const config = require('../../fishfingers/config')
const path = require('path')

// Parse all source files, and extract documentation from comments
const sourceFiles = glob.sync(
  path.join(process.cwd().replace('\\', '/'), config.src ,'/**/!(*.spec|*.test).js')
)

const sourceDoc = sourceFiles.reduce((acc, sourceFilePath) => Object.assign(acc, parseSourceAst(sourceFilePath)), {})

// Now parse all example files and associate examples with the documentation
const exampleFiles = glob.sync(
  path.join(process.cwd().replace('\\', '/'), config.src ,'/**/*.md')
)
exampleFiles.forEach(exampleFilePath => parseExample(exampleFilePath, sourceDoc)) 

// Finally write the parsed file to disc
fs.writeFile('doc/parsedJson.json', JSON.stringify(sourceDoc, null, 4), 'utf8', () => {})