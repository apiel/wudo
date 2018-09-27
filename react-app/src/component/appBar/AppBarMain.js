import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';

import AppBarProfile from './AppBarProfile';
import AppTitle from './AppBarTitle';
import styles from './AppBarStyle';
import { urls } from '../../Routes';

const PrimarySearchAppBar = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <AppTitle classes={classes} />
        <div className={classes.grow} />
        <div className={classes.menuButtons}>
          <Link to={urls.follow} className={classes.link} title="Search for some contacts and tags">
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Link>
          <Link to={urls.followers} className={classes.link} title="See who is following you">
            <IconButton color="inherit">
              <PeopleIcon />
            </IconButton>
          </Link>
        </div>
        <AppBarProfile />
      </Toolbar>
    </AppBar>
  </div>
);

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);