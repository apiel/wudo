import React from 'react';
import { Mutation } from 'react-apollo';

import PostForm from './PostForm';
import ADD_POST from './gql/addPost'

const PostMutation = () => (
  <Mutation
    mutation={ADD_POST}
    onError={err => console.log('errrrrrrrrrrrr', err)}
  >
    {(addPost, result) => (
      <PostForm addPost={addPost} result={result} />
    )}
  </Mutation>
);

export default PostMutation;
