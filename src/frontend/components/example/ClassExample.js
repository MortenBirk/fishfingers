import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import PropertiesTable from './PropertiesTable'
import CodeExamples from './CodeExamples'

const ClassExample = ({ classExample }) => {
  return (
    <Fragment>
      <Typography  variant='h1' paragraph>
        {classExample.name}
      </Typography>

      {classExample.doc.desc && classExample.doc.desc.split('\n').map((e, idx) => <Typography key={idx} paragraph>{e}</Typography>)}

      <PropertiesTable properties={classExample.properties}/>

      <CodeExamples codeExamples={classExample.examples}/>

    </Fragment>
  )
}

export default ClassExample