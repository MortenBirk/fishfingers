import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

import CodeExample from './CodeExample'

const CodeExamples = ({ codeExamples }) => {
  if (!codeExamples ||codeExamples.length < 1) {
    return null
  }
  return (
    <Fragment>
      <Typography  variant='h2' paragraph>
        Examples
      </Typography>
      <hr/>
      <br/>
      {codeExamples.map((codeExample, idx) => <CodeExample codeExample={codeExample} key={idx}/>)}
    </Fragment>
  )
}

export default CodeExamples