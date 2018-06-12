import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

class SearchTerm extends Component {
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
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
          fontSize: '24px'
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

export default SearchTerm;
