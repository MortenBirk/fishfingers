import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});

const ParameterTable = ( { parameters })  => {

  const classes = useStyles()

  return (
    <Fragment>
      <Typography  variant='h2' paragraph>
        Parameters
      </Typography>
      <TableContainer style={{marginBottom: 50}} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Default</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((param) => (
              <TableRow key={param.name}>
                <TableCell component="th" scope="row">
                  {param.name}
                </TableCell>
                <TableCell>{param.valueType}</TableCell>
                <TableCell>{param.default || 'required'}</TableCell>
                <TableCell>{param.desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>    
    </Fragment>
  )
}

export default ParameterTable