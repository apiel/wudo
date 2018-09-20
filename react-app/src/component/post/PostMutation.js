import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import PostForm from './PostForm';

// https://github.com/neo4j-graphql/neo4j-graphql/issues/59
// https://github.com/apollographql/react-apollo/issues/238
// or make the tags logic in the resolver <- might make more sense
// but lets first implement addTag to play around
const ADD_POST = gql`
  mutation AddPost($text: String!) {
      addPostAndTag(
        post: {
          text: $text
          tags: ["ouioui","javascript2","yo","hello"]
        }
      ) {
        idPost
      }
  }
`;

const PostMutation = () => (
  <Mutation mutation={ADD_POST}>
    {(addPost) => (
      <PostForm addPost={addPost} />
    )}
  </Mutation>
);

export default PostMutation;
