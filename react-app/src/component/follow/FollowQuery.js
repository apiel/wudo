import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import GET_FOLLOWERS from '../../gql/query/getFollowers';

import FollowMutation from './FollowMutation';

const FollowQuery = ({ search }) => (
    <Query
        query={GET_FOLLOWERS}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            const followUserTags = get(data, 'getFollowers.followUserTags', []);
            let users = get(data, 'getFollowers.users', []);

            if (search) {
                users = users.filter(
                    user => user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                );
            }

            if (!followUserTags.length) return <p>You dont follow anyone</p>;

            return followUserTags.map(({ idUser, tags }) => {
                const userIndex = users.findIndex(user => user.idUser === idUser);
                if (userIndex === -1) {
                    return null
                }
                const user = users[userIndex];

                user.tags.forEach(
                    userTag => userTag.active =
                        tags.findIndex(tag => tag.active && tag.idItem === userTag.idTag) !== -1
                );
                return (
                    <FollowMutation key={idUser} user={user} />
                );
            });
        }}
    </Query>
);

export default FollowQuery;
