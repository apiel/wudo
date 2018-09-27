import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import AuthGoogleBtn from './AuthGoogleBtn';
import GOOGLE_AUTH from '../../gql/mutation/googleAuth';
import { AuthConsumer } from '../../context/Auth';

// could use react-adopt
const AuthGoogleMutation = ({ classes }) => (
  <AuthConsumer>
    {({ saveToken }) => (
      <Mutation
        mutation={GOOGLE_AUTH}
      >
        {(googleAuth, result) => (
          <AuthGoogleBtn
            googleAuth={googleAuth}
            result={result}
            classes={classes}
            saveToken={saveToken}
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
