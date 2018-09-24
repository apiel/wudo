import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import GET_FOLLOWERS from '../../gql/getFollowers';

import AppBarBack from '../appBar/AppBarBack';

// we might display all the tags we created
// so we should get tags as well
// loop tags
const Followers = () => (
    <div>
        <AppBarBack title='Followers' />
        <Query
            query={GET_FOLLOWERS}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                const followers = get(data, 'getFollowers.tagsFollowedByUser', []);
                if (!followers.length) return <p>Nobody follow this tag</p>;

                return followers.map(({ idTag, users }) => (
                    <p key={idTag}>{JSON.stringify(users)}</p>
                ));
            }}
        </Query>
    </div>
);

export default Followers;
