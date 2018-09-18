import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import LinearProgress from '@material-ui/core/LinearProgress';

import PostOgp from './PostOgp';

const OGS = gql`
query Ogs($url: String!) {
    ogs(url: $url) {
      error
      title
      description
      image {
        url
      }
      video {
        url
      }
    }
  }
`;

const PostOgpQuery = ({ url }) => (
    <Query
        query={OGS}
        variables={{url}}
    >
        {({ loading, error, data }) => {
            if (loading) return (<LinearProgress />);
            if (error) return null;
            return get(data, 'ogs.title') ? (
                <PostOgp url="yo" ogp={data.ogs} />
            ) : null;
        }}
    </Query>
);

export default PostOgpQuery;
