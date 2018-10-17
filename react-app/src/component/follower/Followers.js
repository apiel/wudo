import React from 'react';
import groupBy from 'lodash/groupBy';
import Queries from 'react-apollo-composer';
import Typography from '@material-ui/core/Typography';

import GET_FOLLOWERS from '../../gql/query/getFollowers';
import GET_ME from '../../gql/query/getMe';

import AppBarBack from '../appBar/AppBarBack';
import FollowerCard from './FollowerCard';
import HelpCard from '../HelpCard';
import Snackbar from '../Snackbar';

const Followers = () => (
    <div>
        <AppBarBack title='Tag followers' />
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
        <HelpCard styles={{ maxWidth: 300 }}>
            <Typography variant="body1" gutterBottom>
                This is the list of your tags and followers. You can click on your followers to allow or block them from following your tags.
            </Typography>
        </HelpCard>
        <Snackbar />
    </div>
);

export default Followers;
