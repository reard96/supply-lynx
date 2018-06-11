/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
// import PhoneIcon from '@material-ui/icons/PhoneIcon';
// import FavoriteIcon from '@material-ui/icons/FavoriteIcon';
// import PersonalPinIcon from '@material-ui/icons/PersonalPinIcon';
// import CloudIcon from '@material-ui/icons/CloudIcon';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import { connect } from 'react-redux';
import './react-select.css';

import CustomizedTable from './ContractsTable';

class Option extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onSelect(this.props.option, event);
  }

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component='div'
        style={{
          fontWeight: isSelected ? 500 : 400,
          fontSize: '32px'
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;
  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>No results found</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              style={{ fontSize: '24px' }}
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }
        return <div className='Select-value'>{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
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

class IntegrationReactSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
      tab: 0,
      orders: []
    };
    this.addSearchTerm = this.addSearchTerm.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { orders } = nextProps;
    this.setState({ orders })
  }

  addSearchTerm(value) {
    let { orders } = this.props;
    const { tab } = this.state;
    const search = !value ? [] : value.split(',');
    const status = ['all', 'requested', 'accepted', 'completed', 'cancelled'];
    let filtered = []
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
    let filtered = []
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
        <br />
        <TextField
          style={{ width: '500' }}
          fullWidth={false}
          value={this.state.search}
          onChange={this.addSearchTerm}
          placeholder='Select Services'
          name='react-select-chip-label'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: SelectWrapped,
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
        <Paper>
          <Tabs
            value={this.state.tab}
            onChange={this.changeTab}
            fullWidth
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab label='ALL' />
            <Tab label='REQUESTED' />
            <Tab label='ACCEPTED' />
            <Tab label='COMPLETED' />
            <Tab label='CANCELLED' />
          </Tabs>
          <CustomizedTable users={users} orders={orders} services={services} />
        </Paper>
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ orders, user, users, services }) => {
  return { orders, user, users, services };
};

const styledComponent = withStyles(styles)(IntegrationReactSelect);

export default connect(mapStateToProps)(styledComponent);
