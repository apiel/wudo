import React from 'react';
import { Mutation } from 'react-apollo';

import PostForm from './PostForm';
import ADD_POST from './gql/addPost'

const PostMutation = () => (
  <Mutation mutation={ADD_POST}>
    {(addPost) => (
      <PostForm addPost={addPost} />
    )}
  </Mutation>
);

export default PostMutation;
