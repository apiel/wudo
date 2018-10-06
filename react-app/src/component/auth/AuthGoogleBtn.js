import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { GoogleLogin } from 'react-google-login';

import GET_ME from '../../gql/query/getMe';

const googleWebClientId = process.env.REACT_APP_GOOGLE_WEB_CLIENT_ID;

class AuthGoogleBtn extends React.Component {
  onFailure= data => console.error('google err', data); // we should show an error

  onSuccess = ({ tokenId }) => {
    // console.log('tokenId', tokenId);
    this.props.googleAuth({
      variables: { tokenId },
      update: (proxy, { data: { googleAuth }}) => {
        this.props.result.client.resetStore(); // reFetchObservableQueries would work as well
        const query = GET_ME;
        const getMe = googleAuth.user;
        const data = { getMe };
        data.getMe = getMe;
        proxy.writeQuery({ query, data });
        // this.props.result.client.reFetchObservableQueries(); // could use this instead of resetStore
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
