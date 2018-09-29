import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import { adopt } from 'react-adopt';

import GET_FOLLOWERS from '../../gql/query/getFollowers';
import GET_ME from '../../gql/query/getMe';

import AppBarBack from '../appBar/AppBarBack';
import FollowerCard from './FollowerCard';

const Composed = adopt({
    me: ({ render }) => <Query query={GET_ME}>{render}</Query>,
    followers: ({ render }) => <Query query={GET_FOLLOWERS}>{render}</Query>,
});

const Followers = () => (
    <div>
        <AppBarBack title='Followers' />
        <Composed>
            {({ me, followers }) => {
                if (me.loading || followers.loading) return <p>Loading...</p>;
                if (me.error || followers.error) return <p>Error :(</p>;

                const { data: { getFollowers } } = followers;
                const { data: { getMe: { tags } } } = me;

                const tagsFollowedByUser = get(getFollowers, 'tagsFollowedByUser', []);
                const users = get(getFollowers, 'users', []);
                // console.log('getFollowers', getFollowers);

                return tags.map(({ idTag, name }) => {
                    // console.log('tag', idTag, name);
                    const index = tagsFollowedByUser.findIndex(follower => follower.idTag === idTag);
                    const followers = index === -1 ? [] : tagsFollowedByUser[index].users;
                    // console.log('followers', followers);
                    return (
                        <FollowerCard
                            key={idTag}
                            idTag={idTag}
                            name={name}
                            users={users}
                            followers={followers}
                        />
                    );
                });
            }}
        </Composed>
        <p>Tooltip help: here is followers... click on name to allow or forbid them to follow your tags.</p>
    </div>
);

export default Followers;
