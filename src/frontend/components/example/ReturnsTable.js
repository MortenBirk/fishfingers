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
    minWidth: 650,
  },
});

const ReturnsTable = ( { returns })  => {

  const classes = useStyles()

  return (
    <Fragment>

      <Typography  variant='h2' paragraph>
        Returns
      </Typography>

      <TableContainer style={{marginBottom: 50}}  component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {returns.valueType}
              </TableCell>
              <TableCell>{returns.desc}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>    
    </Fragment>
  )
}

export default ReturnsTable