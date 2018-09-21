import React from 'react';
import { Query } from 'react-apollo';

import Post from './Post';
import PostMutation from './PostMutation';
import GET_POSTS from './query/getPosts';


const Posts = () => (
    <div>
        <PostMutation />
        <Query
            query={GET_POSTS}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return data.getPosts.map(({ idPost, ...post }) => (
                    <Post key={idPost} post={post} />
                ));
            }}
        </Query>
    </div>
);

export default Posts;
