import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const Home = () => (
  <div>
    <Paper>
    </Paper>
  </div>
);

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Home);
