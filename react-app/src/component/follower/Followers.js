import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import GET_FOLLOWERS from '../../gql/getFollowers';
import GET_ME from '../../gql/getMe';

import AppBarBack from '../appBar/AppBarBack';
import FollowerItem from './FollowerItem';

// we might display all the tags we created
// so we should get tags as well
// loop tags
const Followers = () => (
    <div>
        <AppBarBack title='Followers' />
        <Query
            query={GET_ME}
        >
            {({ loading, error, data: { getMe: { tags } } }) => {
                if (loading) return <p>Loading tags...</p>;
                if (error) return <p>Error :(</p>;

                // console.log('tags', tags);

                return (
                    <Query
                        query={GET_FOLLOWERS}
                    >
                        {({ loading, error, data: { getFollowers } }) => {
                            if (loading) return <p>Loading followers...</p>;
                            if (error) return <p>Error :(</p>;

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
                );
            }}
        </Query>
    </div>
);

export default Followers;
