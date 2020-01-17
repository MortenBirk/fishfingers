import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import ParameterTable from './ParameterTable'

const FunctionExample = ({ name, description, parameters }) => {
  return (
    <Fragment>
      <Typography  variant='h2' paragraph>
        {name}
      </Typography>

      <Typography paragraph>
        {description}
      </Typography>

      <ParameterTable parameters={parameters}/>

    </Fragment>
  )
}

export default FunctionExample