import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import FunctionExample from './FunctionExample'
import Prism from "prismjs";
import '../../css/prism.css'

const OldExample = ({ name, description, example }) => {
  return (
    <Fragment>
      <Typography  variant='h2' paragraph>
        {name}
      </Typography>

      <Typography paragraph>
        {description}
        <br/>
        {console.log(example.toString())}
        <pre>
          <code className="language-javascript">
            {example.toString()}
          </code>
        </pre>
        <br/>
        {'' + example()}
      </Typography>
    </Fragment>
  )
}

const Example = ({ example }) => {
  if (example.type === 'function') {
    return (
      <FunctionExample 
        name={example.name}
        description={example.doc.desc}
        parameters={example.doc.params}/>
    )
  }
  return null
}

const TestExample = () => {
  return (
    <Example 
      name='Ndvi'
      description='Ndvi is very very awesome'
      example={() => {
        const x = 5 + 5
        const y = [1, 2, 3]
        const res = y.map((e) => x + e)
        console.log(res)
        return res
      }}
    />
  )
}

export default Example