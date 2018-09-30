import React from 'react';
import { Query } from 'react-apollo';
import groupBy from 'lodash/groupBy';
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

                const followersByTag = groupBy(getFollowers, item => item.tag.idTag);

                return tags.map(({ idTag, name }) => {
                    const tagFollowers = followersByTag[idTag];
                    return (
                        <FollowerCard
                            key={idTag}
                            idTag={idTag}
                            name={name}
                            tagFollowers={tagFollowers}
                        />
                    );
                });
            }}
        </Composed>
        <p>Tooltip help: here is followers... click on name to allow or forbid them to follow your tags.</p>
    </div>
);

export default Followers;
