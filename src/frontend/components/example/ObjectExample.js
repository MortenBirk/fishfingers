import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import ReturnsTable from './ReturnsTable'
import PropertiesTable from './PropertiesTable'
import CodeExamples from './CodeExamples'

const ObjectExample = ({ objectExample }) => {
  return (
    <Fragment>
      <Typography  variant='h1' paragraph>
        {objectExample.name}
      </Typography>

      <Typography paragraph>
        {objectExample.doc.desc}
      </Typography>

      <PropertiesTable properties={objectExample.properties}/>

    </Fragment>
  )
}

export default ObjectExample