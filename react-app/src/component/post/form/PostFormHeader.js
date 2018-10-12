import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import moment from 'moment';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from '../../Avatar';

import GET_ME from '../../../gql/query/getMe';

const PostFormHeader = ({ data: { getMe } }) => (
    <CardHeader
        avatar={
            <Avatar user={getMe} />
        }
        title={getMe.name}
        subheader={moment().calendar()} // LLLL
    />
);

PostFormHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(GET_ME)(PostFormHeader);
