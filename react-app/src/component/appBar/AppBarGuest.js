import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import AppTitle from './AppBarTitle';
import styles from './AppBarStyle';

const AppBarGuest = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <AppTitle classes={classes} />
      </Toolbar>
    </AppBar>
  </div>
);

AppBarGuest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarGuest);