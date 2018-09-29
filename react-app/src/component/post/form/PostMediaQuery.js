import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import LinearProgress from '@material-ui/core/LinearProgress';

import PostMedia from '../PostMedia';

const OGS = gql`
query Ogs($url: String!) {
    ogs(url: $url) {
      error
      title
      description
      image
      video
    }
  }
`;

const PostMediaQuery = ({ url, setMedia }) => (
    <Query
        query={OGS}
        variables={{url}}
    >
        {({ loading, error, data }) => {
            setMedia(null);
            if (loading) return (<LinearProgress />);
            if (error) return null;
            return get(data, 'ogs.title') ? (
                <PostMedia url={url} og={data.ogs} setMedia={setMedia} />
            ) : null;
        }}
    </Query>
);

export default PostMediaQuery;
