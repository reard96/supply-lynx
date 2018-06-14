import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './react-select.css';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import Request from './Request';
import Order from './Order';
import Selected from './Selected';
import OrderTable from './OrderTable';
import StatusTabs from './StatusTabs';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: '42px',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: 200,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: 200,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      order: {},
      product: {},
      buyer: {},
      seller: {},
      search: [],
      orders: [],
      onlyOwn: false,
      requestOpen: false,
      orderOpen: false
    };
    this.addSearchTerm = this.addSearchTerm.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.showOnlyOwn = this.showOnlyOwn.bind(this);
    this.openRequest = this.openRequest.bind(this);
    this.closeRequest = this.closeRequest.bind(this);
    this.openOrder = this.openOrder.bind(this);
    this.closeOrder = this.closeOrder.bind(this);
    this.setOrder = this.setOrder.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { orders } = nextProps;
    this.setState({ orders });
  }

  setOrder(order, product, buyer, seller) {
    this.setState({ order, product, buyer, seller });
  }

  openRequest() {
    this.setState({ requestOpen: true });
  }

  closeRequest() {
    this.setState({ requestOpen: false });
  }

  openOrder() {
    this.setState({ orderOpen: true });
  }

  closeOrder() {
    this.setState({ orderOpen: false });
  }

  showOnlyOwn() {
    const { onlyOwn } = this.state;
    let { orders } = this.props;
    if (!onlyOwn) {
      orders = orders.filter(order => {
        return order.buyer === web3.eth.accounts[0] || order.seller === web3.eth.accounts[0];
      });
    }
    this.setState({ onlyOwn: !onlyOwn, search: [], tab: 0, orders });
  }

  addSearchTerm(value) {
    let { orders } = this.props;
    const { tab } = this.state;
    const search = !value ? [] : value.split(',');
    const status = ['all', 'requested', 'accepted', 'completed', 'cancelled'];
    let filtered = [];
    const { onlyOwn } = this.state;
    if (onlyOwn) {
      orders = orders.filter(order => {
        return order.buyer === web3.eth.accounts[0] || order.seller === web3.eth.accounts[0];
      });
    }
    if (tab !== 0) {
      orders = orders.filter(order => order.status === status[tab]);
    }
    if (search.length !== 0) {
      for (let term of search) {
        const results = orders.filter(order => order.productId === term * 1);
        filtered = [...filtered, ...results];
      }
    }
    else {
      filtered = orders;
    }
    this.setState({ search, orders: filtered });
  }

  changeTab(event, value) {
    let { orders } = this.props;
    const { search } = this.state;
    let filtered = [];
    const status = ['all', 'requested', 'accepted', 'completed', 'cancelled'];
    const { onlyOwn } = this.state;
    if (onlyOwn) {
      orders = orders.filter(order => {
        return order.buyer === web3.eth.accounts[0] || order.seller === web3.eth.accounts[0];
      });
    }
    if (value !== 0) {
      orders = orders.filter(order => order.status === status[value]);
    }
    if (search.length !== 0) {
      for (let term of search) {
        const results = orders.filter(order => order.productId === term * 1);
        filtered = [...filtered, ...results];
      }
    }
    else {
      filtered = orders;
    }
    this.setState({ tab: value, orders: filtered });
  }

  render() {
    const { classes, users, services } = this.props;
    const { orders, order, product, buyer, seller, search, onlyOwn, orderOpen, requestOpen, tab } = this.state;
    const { addSearchTerm, showOnlyOwn, openRequest, closeOrder, closeRequest, changeTab, openOrder, setOrder } = this;
    const suggestions = services.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }).map(service => ({
      value: service.id,
      label: service.name
    }));
    return (
      <div className={classes.root}>
        <Paper>
          <FormGroup row>
            <TextField
              style={{ flex: 1 }}
              fullWidth={false}
              value={search}
              onChange={addSearchTerm}
              placeholder='Select Services'
              name='react-select-chip-label'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputComponent: Selected,
                inputProps: {
                  classes,
                  multi: true,
                  instanceId: 'react-select-chip-label',
                  id: 'react-select-chip-label',
                  simpleValue: true,
                  options: suggestions
                },
              }}
            />
            <Tooltip placement='top' title='Toggle between own orders and all orders.'>
              <FormControlLabel
                style={{ marginLeft: 100, marginRight: 100 }}
                control={
                  <Switch
                    checked={onlyOwn}
                    onChange={showOnlyOwn}
                  />
                }
                label='MY ORDERS'
              />
            </Tooltip>
            <Button
              style={{ flex: 1 }}
              onClick={openRequest}
              color='secondary'
            >
              <LibraryAdd style={{ marginRight: 10 }} />
              Create Request
            </Button>
          </FormGroup>
          <Order order={order} product={product} buyer={buyer} seller={seller} orderOpen={orderOpen} closeOrder={closeOrder} />
          <Request requestOpen={requestOpen} closeRequest={closeRequest} />
          <br />
          <StatusTabs tab={tab} changeTab={changeTab} />
          <Divider />
          <OrderTable users={users} orders={orders} search={search} services={services} openOrder={openOrder} setOrder={setOrder} />
        </Paper>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ orders, user, users, services }) => {
  return { orders, user, users, services };
};

const styledComponent = withStyles(styles)(Dashboard);

export default connect(mapStateToProps)(styledComponent);
