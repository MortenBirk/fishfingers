import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import ReturnsTable from './ReturnsTable'
import PropertiesTable from './PropertiesTable'
import CodeExamples from './CodeExamples'

const ClassExample = ({ classExample }) => {
  return (
    <Fragment>
      <Typography  variant='h1' paragraph>
        {classExample.name}
      </Typography>

      <Typography paragraph>
        {classExample.doc.desc}
      </Typography>

      <PropertiesTable properties={classExample.properties}/>

      <CodeExamples codeExamples={classExample.examples}/>

    </Fragment>
  )
}

export default ClassExample