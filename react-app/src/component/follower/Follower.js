import React from 'react';
// import { Query } from 'react-apollo';

// import GET_POSTS from '../../gql/getPosts';

import AppBarBack from '../appBar/AppBarBack';
import { urls } from '../../Routes';

const Follow = () => (
    <div>
        <AppBarBack title='Followers' link={urls.follower} />
        Follower
    </div>
);

export default Follow;
