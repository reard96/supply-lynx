/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import { connect } from 'react-redux';
import './react-select.css';
import Request from './Request';
import Selected from './Selected';
import OrderTable from './OrderTable';
import StatusTabs from './StatusTabs';

const ITEM_HEIGHT = 48;

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
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
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
      search: [],
      orders: [],
      onlyOwn: false,
      formOpen: false
    };
    this.addSearchTerm = this.addSearchTerm.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.showOnlyOwn = this.showOnlyOwn.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { orders } = nextProps;
    this.setState({ orders });
  }

  openForm() {
    this.setState({ formOpen: true });
  }

  closeForm() {
    this.setState({ formOpen: false });
  }

  showOnlyOwn() {
    const { onlyOwn } = this.state;
    let { orders } = this.props;
    if (!onlyOwn) {
      orders = orders.filter(order => order.buyer === web3.eth.accounts[0] || order.seller === web3.eth.accounts[0]);
    }
    this.setState({ onlyOwn: !onlyOwn, search: [], orders });
  }

  addSearchTerm(value) {
    let { orders } = this.props;
    const { tab } = this.state;
    const search = !value ? [] : value.split(',');
    const status = ['all', 'requested', 'accepted', 'completed', 'cancelled'];
    let filtered = [];
    if (tab !== 0) {
      orders = orders.filter(order => order.status === status[tab]);
    }
    if (search.length !== 0) {
      for (let term of search) {
        const results = orders.filter(order => order.productId == term);
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
    if (value !== 0) {
      orders = orders.filter(order => order.status === status[value]);
    }
    if (search.length !== 0) {
      for (let term of search) {
        const results = orders.filter(order => order.productId == term);
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
    const { orders } = this.state;
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Paper>
          <FormGroup row>
            <TextField
              style={{ width: 500 }}
              fullWidth={false}
              value={this.state.search}
              onChange={this.addSearchTerm}
              placeholder="Select Services"
              name="react-select-chip-label"
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
            <FormControlLabel
              style={{ marginLeft: 10 }}
              control={
                <Switch
                  checked={this.state.onlyOwn}
                  onChange={this.showOnlyOwn}
                />
              }
              label="Own Orders Only"
            />
            <Button
              style={{ flex: 1 }}
              onClick={this.openForm}
              color="secondary"
            >
              Create Request
              <LibraryAdd style={{ marginLeft: 10 }} />
            </Button>
          </FormGroup>
          <Request formOpen={this.state.formOpen} closeForm={this.closeForm} />
          <StatusTabs tab={this.state.tab} changeTab={this.changeTab} />
          <OrderTable users={users} orders={orders} services={services} />
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
