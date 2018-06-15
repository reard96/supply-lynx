import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  homeButton: {
    marginRight: 10,
    width: 55,
    height: 55,
  },
  avatar: {
    width: 50,
    height: 50,
  }
};

const NavBar = ({ classes }) => {
  return (
    <div>
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Link to='/'>
              <IconButton className={classes.homeButton}>
                <Avatar
                  src='/lynx-icon.jpg'
                  className={classes.avatar}
                />
              </IconButton>
            </Link>
            <Typography variant='display1' color='inherit' className={classes.flex}>
              Lynx
            </Typography>
            {/* <Link to='/about'>
              <Button>About</Button>
            </Link> */}
            <a href='https://github.com/reard96/supply-lynx'>
              <IconButton>
                <Avatar
                  src='/github-icon.png'
                />
              </IconButton>
            </a>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
