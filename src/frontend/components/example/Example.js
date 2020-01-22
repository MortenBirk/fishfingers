import React from 'react'
import FunctionExample from './FunctionExample'
import ClassExample from './ClassExample'
import ObjectExample from './ObjectExample'

const Example = ({ name, example }) => {
  if (example.type === 'function') {
    return (
      <FunctionExample 
        name={name || example.name}
        description={example.doc.desc}
        parameters={example.doc.params}
        returns={example.doc.returns}
        codeExamples={example.examples || []}/>
    )
  }

  if (example.type === 'class') {
    return (
      <ClassExample 
        classExample={example}/>
    )
  }

  if (example.type === 'object') {
    return (
      <ObjectExample 
        objectExample={example}/>
    )
  }

  return null
}

export default Example