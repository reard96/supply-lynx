import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Cancel from '@material-ui/icons/Cancel';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Clear from '@material-ui/icons/Clear';
import Select from 'react-select';
import SearchTerm from './SearchTerm';

const Selected = ({ classes, ...other }) => {
  return (
    <Select
      optionComponent={SearchTerm}
      noResultsText={<Typography>No results found</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUp /> : <ArrowDropDown />;
      }}
      clearRenderer={() => <Clear />}
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
              deleteIcon={<Cancel onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }
        return <div className='Select-value'>{children}</div>;
      }}
      {...other}
    />
  );
};

export default Selected;
