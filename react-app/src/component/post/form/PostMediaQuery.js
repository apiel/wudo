import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import LinearProgress from '@material-ui/core/LinearProgress';

import PostMedia from '../PostMedia';
import GET_MEDIA from '../../../gql/query/getMedia';

const PostMediaQuery = ({ url, setMedia }) => (
    <Query
        query={GET_MEDIA}
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
