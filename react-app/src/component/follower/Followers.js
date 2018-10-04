import React from 'react';
import groupBy from 'lodash/groupBy';
import Queries from 'react-apollo-composer';

import GET_FOLLOWERS from '../../gql/query/getFollowers';
import GET_ME from '../../gql/query/getMe';

import AppBarBack from '../appBar/AppBarBack';
import FollowerCard from './FollowerCard';

const Followers = () => (
    <div>
        <AppBarBack title='Followers' />
        <Queries queries={{ me: GET_ME, followers: GET_FOLLOWERS }}>
            {({ me, followers, _loading, _hasError }) => {
                if (_loading) return <p>Loading...</p>;
                if (_hasError) return <p>Error :(</p>;

                const { data: { getFollowers } } = followers;
                const { data: { getMe: { tags } } } = me;

                const followersByTag = groupBy(getFollowers, item => item.tag.idTag);

                return tags.map(({ idTag, name }) => {
                    const tagFollowers = followersByTag[idTag] || [];
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
        </Queries>
        <p>Tooltip help: here is followers... click on name to allow or forbid them to follow your tags.</p>
    </div>
);

export default Followers;
