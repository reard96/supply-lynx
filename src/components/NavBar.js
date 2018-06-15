import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginRight: 10,
  },
};

const NavBar = ({ classes }) => {
  const img = <img src='/lynx-image.jpeg' height='40' width='30' />;
  return (
    <div>
      <div className={classes.root}>
        <AppBar position='static' color='default' title={img}>
          <Toolbar>
            <Link to='/'>
              <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                {img}
              </IconButton>
            </Link>
            <Typography variant='display1' color='inherit' className={classes.flex}>
              Lynx
            </Typography>
            {/* <Link to='/dashboard'>
              <Button>Dashboard</Button>
            </Link> */}
            <Link to='/about'>
              <Button>About</Button>
            </Link>
            <Link to='/faq'>
              <Button>FAQ</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
