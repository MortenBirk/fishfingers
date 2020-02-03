import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import ReturnsTable from './ReturnsTable'
import ParameterTable from './ParameterTable'
import CodeExamples from './CodeExamples'

const FunctionExample = ({ name, description, parameters, returns, codeExamples }) => {
  return (
    <Fragment>
      <Typography  variant='h1' paragraph>
        {name}( )
      </Typography>

      {description && description.split('\n').map(e => <Typography paragraph>{e}</Typography>)}

      <ParameterTable parameters={parameters}/>

      {returns && <ReturnsTable returns={returns}/>}

    <CodeExamples codeExamples={codeExamples}/>

    </Fragment>
  )
}

export default FunctionExample