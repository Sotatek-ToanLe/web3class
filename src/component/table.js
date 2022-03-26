import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    padding: '0 5rem'
  },
});

export default function CustomizedTables({rows}) {
  const classes = useStyles();

  return (
    <div style={{margin: '5rem'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
              <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRow key={row.name}>
            
              <StyledTableCell>{row.src}</StyledTableCell>
                <StyledTableCell>{row.__typename.slice(0, 7)}</StyledTableCell>
              <StyledTableCell >{row.amount}</StyledTableCell>
              <StyledTableCell>{moment.unix(row.time).format('HH:MM  MM/DD/YYYY')}</StyledTableCell>
         
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
 </div>
  );
}