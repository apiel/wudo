import React from 'react';
import { Query } from 'react-apollo';

import FIND_USERS from '../../gql/query/findUsers';
import FollowItem from './FollowItem';

const FollowSearch = ({ search }) => !search ? null :(
    <Query
        query={FIND_USERS}
        variables={{ search: `%${search}%` }}
    >
        {({ loading, error, data: { findUsers } }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            // console.log('findUsers', findUsers);
            return findUsers.length ? findUsers.map(user => <FollowItem key={user.idUser} user={user} />)
                    : (<p>No result found, need tooltip</p>)
        }}
    </Query>
);

export default FollowSearch;
