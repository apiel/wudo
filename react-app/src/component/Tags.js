import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Tags = () => (
  <Query
    query={gql`
        {
            getTags {
                name
                creationDate
            }
        }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getTags.map(({ name, creationDate }) => (
        <div key={name}>
          <p>{`${name}: ${creationDate}`}</p>
        </div>
      ));
    }}
  </Query>
);

export default Tags;
