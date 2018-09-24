import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import GET_FOLLOWERS from '../../gql/getFollowers';

import AppBarSearch from '../appBar/AppBarSearch';
import FollowItem from './FollowItem';

const Follow = () => (
    <div>
        <AppBarSearch />
        <Query
            query={GET_FOLLOWERS}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                const followUserTags = get(data, 'getFollowers.followUserTags', []);
                const users = get(data, 'getFollowers.users', []);
                const allTags = get(data, 'getFollowers.tags', []);

                if (!followUserTags.length) return <p>You dont follow anyone</p>;

                console.log('followUserTags', followUserTags, users, allTags);
                return followUserTags.map(({ idUser, tags }) => {
                    const userIndex = users.findIndex(user => user.idUser === idUser);
                    const user = users[userIndex];
                    const userTags = allTags.filter(
                        allTag => tags.findIndex(tag => tag.id === allTag.idTag) !== -1
                    );
                    return userIndex === -1 ? null : (
                        <FollowItem key={idUser} user={user} tags={userTags} />
                    );
                });
            }}
        </Query>
    </div>
);

export default Follow;
