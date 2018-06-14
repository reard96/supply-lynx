import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  const img = <img src='/lynx-image.jpeg' height='40' width='30' />
  console.log(props.classes)
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={classes.root}>
        <AppBar position="static" color="default" title={img}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              { img }
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Lynx
            </Typography>
            <Button color="inherit">About</Button>
            <Button color="inherit">FAQ</Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
