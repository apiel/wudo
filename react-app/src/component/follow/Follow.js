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

                if (!followUserTags.length) return <p>You dont follow anyone</p>;

                return followUserTags.map(({ idUser, tags }) => {
                    const userIndex = users.findIndex(user => user.idUser === idUser);
                    const user = users[userIndex];
                    user.tags.forEach(
                        userTag => userTag.color =
                            tags.findIndex(tag => tag.id === userTag.idTag) !== -1
                            ? 'primary' : ''
                    );
                    return userIndex === -1 ? null : (
                        <FollowItem key={idUser} user={user} />
                    );
                });
            }}
        </Query>
        <p>Need tooltip component: click tag to follow or unfollow</p>
    </div>
);

export default Follow;
