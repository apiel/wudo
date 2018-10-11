import React from 'react';

import AppBar from '../appBar/AppBarMain';
import PostForm from './form/PostForm';
import PostsQuery from './PostsQuery';

const Posts = () => (
    <div>
        <AppBar />
        <PostForm />
        <PostsQuery />
    </div>
);

export default Posts;
