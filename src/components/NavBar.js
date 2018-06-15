import React from 'react';
import { Link } from 'react-router-dom';
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
  const gh = <img src='/GitHub-Mark.png' height='40' width='40' />
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" color="default" title={img}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              { img }
            </IconButton>
            <Typography variant='display1' color="inherit" className={classes.flex}>
              Lynx
            </Typography>
            <Link to='/dashboard'>
              <Button color="inherit">Dashboard</Button>
            </Link>
            <Link to='/about'>
              <Button color="inherit">About</Button>
            </Link>
            <a href="https://github.com/reard96/supply-lynx">
              <IconButton className={classes.button}>
                { gh }
              </IconButton>
            </a>
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
