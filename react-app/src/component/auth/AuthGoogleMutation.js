import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import AuthGoogleBtn from './AuthGoogleBtn';
import GOOGLE_AUTH from '../../gql/googleAuth';
import { AuthConsumer } from '../../context/Auth';

const AuthGoogleMutation = ({ classes }) => (
  <AuthConsumer>
    {({ setIsLoggedin }) => (
      <Mutation
        mutation={GOOGLE_AUTH}
      >
        {(googleAuth, result) => (
          <AuthGoogleBtn
            googleAuth={googleAuth}
            result={result}
            classes={classes}
            setIsLoggedin={setIsLoggedin}
          />
        )}
      </Mutation>
    )}
  </AuthConsumer>
);

AuthGoogleMutation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AuthGoogleMutation;
