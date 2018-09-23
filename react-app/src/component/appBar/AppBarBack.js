import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import styles from './AppBarStyle';

const AppBarBack = ({ classes, title, history }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton color="inherit" onClick={history.goBack}>
          <BackIcon />
        </IconButton>
        <Typography className={classes.title} variant="title" color="inherit" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

AppBarBack.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(withRouter(AppBarBack));