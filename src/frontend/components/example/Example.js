import React from 'react'
import FunctionExample from './FunctionExample'

const Example = ({ example }) => {
  console.log(example)
  if (example.type === 'function') {
    return (
      <FunctionExample 
        name={example.name}
        description={example.doc.desc}
        parameters={example.doc.params}
        returns={example.doc.returns}
        codeExamples={example.examples || []}/>
    )
  }
  return null
}

export default Example