import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import PropertiesTable from './PropertiesTable'

const ObjectExample = ({ objectExample }) => {
  return (
    <Fragment>
      <Typography  variant='h1' paragraph>
        {objectExample.name}
      </Typography>

      {objectExample.doc.desc && objectExample.doc.desc.split('\n').map((e, idx) => <Typography key={idx} paragraph>{e}</Typography>)}

      <PropertiesTable properties={objectExample.properties}/>

    </Fragment>
  )
}

export default ObjectExample