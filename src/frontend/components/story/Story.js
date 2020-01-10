import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Prism from "prismjs";
import '../../css/prism.css'

const Story = ({ name, description, example }) => {
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

const TestStory = () => {
  return (
    <Story 
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

export default TestStory