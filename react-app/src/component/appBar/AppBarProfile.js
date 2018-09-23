import React from 'react';
import { Query } from 'react-apollo';

import GET_ME from '../../gql/getMe';
import Avatar from '../Avatar';

const AppBarProfile = () => (
    <Query
        query={GET_ME}
    >
        {({ data: { getMe } }) => (
            <Avatar user={getMe} useHashColor={false} />
        )}
    </Query>
);

export default AppBarProfile;
