import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

import AuthGoogleBtn from './AuthGoogleBtn';
import AppBarGuest from '../appBar/AppBarGuest';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  img: {
    height: 20,
    with: 20,
    marginRight: theme.spacing.unit,
  },
  google: {
    backgroundColor: '#FFF',
  },
  fb: {
    backgroundColor: '#4267b2',
    color: '#FFF',
  },
  twitter: {},
  github: {},
});

// https://www.npmjs.com/package/react-facebook-login

const Auth = ({ classes }) => (
  <div>
    <AppBarGuest />
    <Grid container justify="center" className={classes.root}>
    <AuthGoogleBtn classes={classes} />
    <Button
      variant="contained"
      className={classNames(classes.button, classes.fb)}
      fullWidth
      disabled
    >
      <img
        className={classes.img}
        src="/fb-logo.png"
        alt=""
      /> Continue with Facebook
    </Button>
  </Grid>
  </div>
);

Auth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auth);
