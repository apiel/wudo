import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

import styles from './AppBarStyle';
import AppBarSearchField from './AppBarSearchField';

const AppBarSearch = ({ classes, history, onSearch, title = null }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton color="inherit" onClick={history.goBack}>
          <BackIcon />
        </IconButton>
        <AppBarSearchField onSearch={onSearch} />
      </Toolbar>
    </AppBar>
  </div>
);

AppBarSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default withStyles(styles)(withRouter(AppBarSearch));