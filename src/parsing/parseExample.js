const fs = require('fs')
const path = require('path')

// This is very crude, and does not garantee to be unique. However for now it works ok
const randomName = () => {
  const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n']
  const max = characters.length -1 
  const randomEntry= () => {
    return characters[Math.floor(Math.random() * max)]
  }
  const result = characters.map(e => randomEntry()).join('')
  return result
}


const parseMarkdown = (mdString) => {
  // Split the string by newlines, and simply analyze in top down fashion, looking for only expected keywords
  const lines = mdString.split('\n')

  const result = {}
  let id = null
  let title = null
  let desc = null
  let uuid = null
  let inScript = false

  lines.forEach(line => {
    if (!inScript) {
      if (line.match(/@id/)) {
        id = line.replace('@id', '').trim()
        uuid = randomName()
        while(result[uuid]) {
          uuid = randomName
        }
        result[uuid] = {
          id: id,
          lines: [],
          title: '',
          desc: ''
        }
      }

      if (!title && uuid && line.match(/@title/)) {
        title = line.replace('@title', '').trim()
        result[uuid].title = title
      }

      if (!desc && uuid && line.match(/@desc/)) {
        desc = line.replace('@desc', '').trim()
        result[uuid].desc = desc
      }

      if (line.match(/```js|```javascript|```jsx/)) {
        if (!id) {
          return
        }
        inScript = true
      }
      return
    }

    if (inScript) {
      if (line.match(/```/)) {
        inScript = false
        id = null
        title = null
        desc = null
        return
      }
      result[uuid].lines.push(line)
    }
  })

  return result
}

const generateExampleCode = (examples, exampleFilePath) => {
  let result = []
  Object.entries(examples).forEach(([key, example]) => {
    const lines = []
    example.lines.forEach(line => {
      if (/import\s+.*\s+from\s+/.test(line)) {
        return
      }
      if (/-*\s*=\s*require\(.*\)/.test(line)) {
        return
      }
      lines.push(line)
    })
    result.push('export function ' + key + '(){\n' + lines.join('\n') + '\n}')
  })
  result = result.join('\n')
  // TODO: This is pure hardcoded and will not work, path should be extracted
  result = fs.readFileSync(path.join(process.cwd(), '/fishfingers/imported.js')).toString() + '\n' + result
  fs.writeFileSync("./doc/examples.js", result) 
}


const parseExample = (exampleFilePath, sourceJson) => {
  const buffer = fs.readFileSync(exampleFilePath).toString()
  const examples = parseMarkdown(buffer)
  
  generateExampleCode(examples, exampleFilePath)

  Object.entries(examples).forEach(([key, example]) => {

    const sourceEntry = (() => {
      const entries = example.id.split('.')
      let entry = sourceJson[entries.shift()]
      while (entries.length > 0) {
        entry = entry.properties[entries.shift()]
      }
      return entry
    })()

    if (!sourceEntry.examples) {
      sourceEntry.examples = []
    }
    sourceEntry.examples.push({
      title: example.title,
      description: example.desc,
      codeString: example.lines.join('\n'),
      codeName: key
    })
  })
}

module.exports = parseExample