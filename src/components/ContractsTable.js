import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

// const data = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function CustomizedTable({ classes, users, orders, services }) {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell padding='checkbox'>
              <Checkbox />
            </CustomTableCell>
            <CustomTableCell numeric>Order ID</CustomTableCell>
            <CustomTableCell>Product</CustomTableCell>
            <CustomTableCell numeric>Quantity</CustomTableCell>
            <CustomTableCell>Unit</CustomTableCell>
            <CustomTableCell numeric>Unit Price</CustomTableCell>
            <CustomTableCell>Buyer</CustomTableCell>
            <CustomTableCell>Seller</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, id) => {
            const product = services && services.find(service => service.id === order.productId);
            const buyer = users && users.find(user => user.address === order.buyer);
            const seller = users && users.find(user => user.address === order.seller);
            return (
              <TableRow className={classes.row} key={id}>
                <CustomTableCell padding='checkbox'>
                  <Checkbox />
                </CustomTableCell>
                <CustomTableCell numeric>{id}</CustomTableCell>
                <CustomTableCell component='th' scope='row'>
                  {product.name}
                </CustomTableCell>
                <CustomTableCell numeric>{order.quantity}</CustomTableCell>
                <CustomTableCell>{order.unit}</CustomTableCell>
                <CustomTableCell numeric>{order.price}</CustomTableCell>
                <CustomTableCell>{buyer && buyer.name || '(none)'}</CustomTableCell>
                <CustomTableCell>{seller && seller.name || '(none)'}</CustomTableCell>
                <CustomTableCell>{order.status}</CustomTableCell>
                <CustomTableCell>
                  <CircularProgress value={Math.floor(Math.random() * 100)} />
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
