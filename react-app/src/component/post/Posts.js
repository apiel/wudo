import React from 'react';

import AppBar from '../appBar/AppBarMain';
import PostMutation from './form/PostMutation';
import PostsQuery from './PostsQuery';

const Posts = () => (
    <div>
        <AppBar />
        <PostMutation />
        <PostsQuery />
    </div>
);

export default Posts;
