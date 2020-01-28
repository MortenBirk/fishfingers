#!/usr/bin/env node

const webpack = require('webpack')
const config = require('./webpack.config')
const parse = require('./src/parsing/parse')
const path = require('path')
const fishconfig = require(path.join(process.cwd(), '/fishfingers/config'))

config.output.path = path.join(process.cwd(), fishconfig.output || 'build')

console.log('Parsing documentation')
parse()

const compiler = webpack(config);
compiler.run((err, stats) => { 
  if (!stats.hasErrors()) {
    console.log('Documentation build: success')
  }  
  else {
    console.log('Documentation build: failed')
    console.log(stats)
  }
})