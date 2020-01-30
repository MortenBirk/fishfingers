const glob = require('glob')
const parseSourceAst = require('./parseSourceAst')
const parseExamples = require('./parseExample')
const fs = require('fs')
const path = require('path')
const config = require(path.join(process.cwd(), '/fishfingers/config'))

const parse = () => {
  if (!fs.existsSync(path.join(__dirname, '../../doc'))){
    fs.mkdirSync(path.join(__dirname, '../../doc'));
  }
  // Parse all source files, and extract documentation from comments
  const sourceFiles = glob.sync(
    path.join(process.cwd().replace('\\', '/'), config.src ,'/**/!(*.spec|*.test).js')
  )

  const sourceDoc = sourceFiles.reduce((acc, sourceFilePath) => Object.assign(acc, parseSourceAst(sourceFilePath)), {})

  // Now parse all example files and associate examples with the documentation
  const exampleFiles = glob.sync(
    path.join(process.cwd().replace('\\', '/'), config.src ,'/**/*.md')
  )
  parseExamples(exampleFiles, sourceDoc)
  

  // Finally write the parsed file to disc
  fs.writeFile(path.join(__dirname, '../../doc/parsedJson.json'), JSON.stringify(sourceDoc, null, 4), 'utf8', (err) => {err && console.log(err)})
}

module.exports = parse