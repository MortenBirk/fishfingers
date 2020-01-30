import React, { Fragment, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import HighlightedCode from './HighlightedCode'
import * as exampleCode from '../../../../doc/examples'

const hijackedLog = (toRun) => {
  const loggedLines = []
  const oldConsoleLog = window.console.log
  try {
    window.console.log = (text) => loggedLines.push(text + '\n')
    toRun()
    window.console.log = oldConsoleLog
  }
  catch (err) {
    console.log('Example failed to run')
    window.console.log = oldConsoleLog
    console.log(err.message)
  }
  return (
    <Paper>
      <pre style={{padding: 10}}>
        <code>
          {loggedLines.map((line, idx) => line)}
        </code>
      </pre>
    </Paper>
  )
}

const CodeExample = ( {codeExample } ) => {

  useEffect(() => Prism.highlightAll(), [])
  
  return (
    <Fragment>
      <Typography  variant='h3' paragraph>
        {codeExample.title}
      </Typography>
    
      <Typography paragraph>
        {codeExample.description}
      </Typography>

      <HighlightedCode codeString={codeExample.codeString}/>
    
      {hijackedLog(exampleCode[codeExample.codeName])}

      <br/>
    </Fragment>
  )

}

export default CodeExample