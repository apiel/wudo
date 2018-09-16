import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Post from './Post';

const GET_POSTS = gql`
{
    getPosts {
        idPost
        text
        creationDate
        user {
            name
        }
        tags {
            name
            idTag
        }
    }
}
`;

const Posts = () => (
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
);

export default Posts;
