import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import ReturnsTable from './ReturnsTable'
import ParameterTable from './ParameterTable'
import CodeExamples from './CodeExamples'

const FunctionExample = ({ name, description, parameters, returns, codeExamples }) => {
  console.log(codeExamples)
  return (
    <Fragment>
      <Typography  variant='h1' paragraph>
        {name}( )
      </Typography>

      <Typography paragraph>
        {description}
      </Typography>

      <ParameterTable parameters={parameters}/>

      {returns && <ReturnsTable returns={returns}/>}

    <CodeExamples codeExamples={codeExamples}/>

    </Fragment>
  )
}

export default FunctionExample