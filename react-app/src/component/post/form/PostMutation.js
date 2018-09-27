import React from 'react';
import { Mutation } from 'react-apollo';

import PostForm from './PostForm';
import ADD_POST from '../../../gql/mutation/addPost';

const PostMutation = () => (
  <Mutation
    mutation={ADD_POST}
  >
    {(addPost, result) => (
      <PostForm addPost={addPost} result={result} />
    )}
  </Mutation>
);

export default PostMutation;
