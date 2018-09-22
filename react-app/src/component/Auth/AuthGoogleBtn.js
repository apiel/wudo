import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { GoogleLogin } from 'react-google-login';

const googleWebClientId = '746478807929-4hpugtvcq9ss69d31kg5dilif0dudktk.apps.googleusercontent.com';
const googleServerClientId = '746478807929-m46e3ae4glhnuqqcv7d1olfh35b31um4.apps.googleusercontent.com';

class AuthGoogleBtn extends React.Component {

  onSuccess= data => console.log('google success', data);
  onFailure= data => console.error('google err', data); // we should show an error

  render() {
    const { classes } = this.props;

    return (
      <GoogleLogin
          disabledStyle
          clientId={googleWebClientId}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          render={({onClick}) => (
            <Button
              variant="contained"
              className={classNames(classes.button, classes.google)}
              fullWidth
              onClick={onClick}
            >
              <img
                className={classes.img}
                src="https://developers.google.com/identity/images/g-logo.png"
                alt=""
              /> Sign in with Google
            </Button>
          )}
      />
    );
  }
}

AuthGoogleBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AuthGoogleBtn;
