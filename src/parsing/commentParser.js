// This is very quick and dirty, and something way more clever can probably be applied

const commentTypes = {
  desc: 'desc',
  param: 'param',
  returns: 'returns',
  type: 'type'
}

const parseDesc = (line) => {
  // Remove surrounding whitespace and initial *
  line = line.trim()
  if (line.charAt(0) === '*') {
    line = line.slice(1).trim()
  }

  return {
    type: commentTypes.desc,
    value: line
  }
}

const parseParam = (line) => {
  const result = {
    type: commentTypes.param,
  }

  // Remove the everything before and including @param
  line = line.substring(line.indexOf('@param')+6)

  // If a type is provided eat it
  const foundType = line.match(/^\s*{.*}/)
  if (foundType) {
    line = line.replace(foundType[0], '')
    result.valueType = foundType[0].trim().slice(1, -1)
  }

  // If a name is provided eat it
  line = line.trim()
  if (line !== '') {
    // If it is optional or has a default, eat that
    if (line.match(/\[.*\].*/)) {
      if (line.match(/\[.*=.*\].*/)) {
        result.name = line.substring(line.indexOf('[') + 1, line.indexOf('=')).trim()
        result.default = line.substring(line.indexOf('=') + 1, line.indexOf(']'))
      }
      else {
        result.name = line.substring(line.indexOf('[') + 1, line.indexOf(']')).trim()
        result.default = 'optional'
      }
      line = line.substring(line.indexOf(']') + 1)
    }
    // Or just eat the name
    else if (line.includes(' ')) {
      result.name = line.substr(0, line.indexOf(' '));
      line = line.substring(line.indexOf(' ') + 1)
    } else {
      result.name = line
      line = ''
    }
  }

    // If a description is available eat it
    if (line !== '') {
      result.desc = parseDesc(line).value
    }

  return result
}

const parseReturns = (line) => {
  const result = {
    type: commentTypes.returns,
  }

  // Remove the everything before and including @returns
  line = line.substring(line.indexOf('@returns')+8)

  // If a type is provided eat it
  const foundType = line.match(/^\s*{.*}/)
  if (foundType) {
    line = line.replace(foundType[0], '')
    result.valueType = foundType[0].trim().slice(1, -1)
  }

  // If a description is available eat it
  if (line !== '') {
    result.desc = parseDesc(line).value
  }

  return result
}

const parseType = (line) => {
  const result = {
    type: commentTypes.type,
  }

  // Remove the everything before and including @returns
  line = line.substring(line.indexOf('@type')+5)

  // If a type is provided eat it
  const foundType = line.match(/^\s*{.*}/)
  if (foundType) {
    line = line.replace(foundType[0], '')
    result.valueType = foundType[0].trim().slice(1, -1)
  }

  return result
}

const parseLine = (line) => {
  // Figure out what kind of line this is and parse it
  const match = line.match(/(@param|@returns|@type)/)
  if (!match) {
    return parseDesc(line)
  }
  if (match[0] === '@param') {
    return parseParam(line)
  }
  if (match[0] === '@returns') {
    return parseReturns(line)
  }
  if (match[0] === '@type') {
    return parseType(line)
  }
}

const parseComment = (comment) => {
  // Split the comment into an array of lines
  let lines = comment.split('\r\n').join('\n').split('\r').join('\n').split('\n')

  const result = {
    desc: [],
    params: []
  }

  // Parse each line and build the result
  lines.forEach(line => {

    const parsed = parseLine(line)

    if (parsed.type === commentTypes.desc) {
      result.desc.push(parsed.value)
    }

    if (parsed.type === commentTypes.returns) {
      result.returns = parsed
    }

    if (parsed.type === commentTypes.param) {
      result.params.push(parsed)
    }

    if (parsed.type === commentTypes.type) {
      result.type = parsed.valueType
    }

  })

  // Reduce the description array containing each line, to a single string with the description
  result.desc = result.desc.reduce((acc, desc) => {
    if (desc === '') {
      return acc + '\n'
    }
    if (acc.endsWith('\n')) {
      return acc + desc
    }
    return acc + ' ' + desc
  } , '').trim()

  return result
}

module.exports = parseComment