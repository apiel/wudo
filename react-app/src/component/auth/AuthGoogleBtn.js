import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { GoogleLogin } from 'react-google-login';

import GET_ME from '../../gql/getMe';

const googleWebClientId = '746478807929-4hpugtvcq9ss69d31kg5dilif0dudktk.apps.googleusercontent.com';

class AuthGoogleBtn extends React.Component {

  onFailure= data => console.error('google err', data); // we should show an error

  onSuccess = ({ tokenId }) => {
    // console.log('tokenId', tokenId);
    this.props.googleAuth({
      variables: { tokenId },
      update: (proxy, { data: { googleAuth }}) => {
        localStorage.setItem('token', googleAuth.jwt);

        const query = GET_ME;
        const getMe = googleAuth.user;
        const data = { getMe };
        proxy.writeQuery({ query, data });
      },
    });
  }

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
  googleAuth: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired, // mutation result
};

export default AuthGoogleBtn;
