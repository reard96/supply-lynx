import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

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
class CustomizedTable extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 5
    };
    this.selectRow = this.selectRow.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeRowsPerPage = this.changeRowsPerPage.bind(this);
  }

  selectRow(order, product, buyer, seller) {
    this.props.setOrder(order, product, buyer, seller);
    this.props.openOrder();
  }

  changePage(event, page) {
    this.setState({ page });
  };

  changeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { classes, users, orders, services } = this.props;
    const { selectRow, changePage, changeRowsPerPage } = this;
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell numeric>Order ID</CustomTableCell>
              <CustomTableCell>Product</CustomTableCell>
              <CustomTableCell numeric>Quantity</CustomTableCell>
              <CustomTableCell>Unit</CustomTableCell>
              <CustomTableCell numeric>Unit Price in Wei</CustomTableCell>
              <CustomTableCell>Buyer</CustomTableCell>
              <CustomTableCell>Seller</CustomTableCell>
              <CustomTableCell>Status</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => {
              const { id, productId, quantity, price, unit, status } = order;
              const product = services && services.find(service => service.id === productId);
              const buyer = users && users.find(user => user.address === order.buyer);
              const seller = users && users.find(user => user.address === order.seller);
              return (
                <TableRow
                  onClick={() => selectRow(order, product, buyer, seller)}
                  className={classes.row}
                  key={id}
                  hover
                >
                  <CustomTableCell numeric>{id}</CustomTableCell>
                  <CustomTableCell>{product && product.name || '(none)'}</CustomTableCell>
                  <CustomTableCell numeric>{quantity}</CustomTableCell>
                  <CustomTableCell>{unit}</CustomTableCell>
                  <CustomTableCell numeric>{price}</CustomTableCell>
                  <CustomTableCell>{buyer && buyer.name || '(none)'}</CustomTableCell>
                  <CustomTableCell>{seller && seller.name || '(none)'}</CustomTableCell>
                  <CustomTableCell>{status}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component='div'
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={changePage}
          onChangeRowsPerPage={changeRowsPerPage}
        />
      </div>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
