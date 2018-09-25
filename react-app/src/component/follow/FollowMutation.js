import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import FollowItem from './FollowItem';
import FOLLOW_USER_TAG from '../../gql/followUserTag';

const FollowMutation = ({user}) => (
  <Mutation
    mutation={FOLLOW_USER_TAG}
  >
    {(followUserTag) => (
      <FollowItem followUserTag={followUserTag} user={user} />
    )}
  </Mutation>
);

FollowMutation.propTypes = {
  user: PropTypes.object.isRequired,
};

export default FollowMutation;
