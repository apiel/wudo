import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import BATCH_FOLLOWERS_AND_ME from '../../gql/batchFollowersAndMe';

import AppBarBack from '../appBar/AppBarBack';
import FollowerItem from './FollowerItem';

// we might display all the tags we created
// so we should get tags as well
// loop tags
const Followers = () => (
    <div>
        <AppBarBack title='Followers' />
        <Query
            query={BATCH_FOLLOWERS_AND_ME}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading followers...</p>;
                if (error) return <p>Error :(</p>;

                const { getFollowers, getMe: { tags } } = data;

                const tagsFollowedByUser = get(getFollowers, 'tagsFollowedByUser', []);
                const users = get(getFollowers, 'users', []);
                // console.log('getFollowers', getFollowers);

                return tags.map(({ idTag, name }) => {
                    // console.log('tag', idTag, name);
                    const index = tagsFollowedByUser.findIndex(follower => follower.idTag === idTag);
                    const followers = index === -1 ? [] : tagsFollowedByUser[index].users;
                    // console.log('followers', followers);
                    return (<FollowerItem key={idTag} name={name} users={users} followers={followers} />);
                });
            }}
        </Query>
    </div>
);

export default Followers;
