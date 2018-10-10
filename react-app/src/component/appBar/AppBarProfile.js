import React from 'react';
import { graphql } from 'react-apollo';

import GET_ME from '../../gql/query/getMe';
import Avatar from '../Avatar';

const AppBarProfile = ({ data: { getMe } }) =>
    <Avatar user={getMe} useHashColor={false} />;

export default graphql(GET_ME)(AppBarProfile);
