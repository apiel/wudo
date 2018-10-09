import React from 'react';
import { graphql } from 'react-apollo';
import groupBy from 'lodash/groupBy';

import GET_TAGS_FOLLOWED from '../../gql/query/getTagsFollowed';

import FollowItem from './FollowItem';

const FollowQuery = ({ search, data: { loading, error, getTagsFollowed }}) =>  {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (!getTagsFollowed.length) return <p>You dont follow anyone</p>;

    if (search) {
        getTagsFollowed = getTagsFollowed.filter(
            item => item.followed.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
    }

    const followedByUser = groupBy(getTagsFollowed, item => item.followed.idUser);

    return Object.values(followedByUser).map(userTags => {
        const user = userTags[0].followed;
        user.tags.forEach(
            tag => tag.active =
                userTags.findIndex(
                    userTag => userTag.active && userTag.tag.idTag === tag.idTag
                ) !== -1
        );
        return (
            <FollowItem key={user.idUser} user={user} />
        );
    });
};

export default graphql(GET_TAGS_FOLLOWED)(FollowQuery);
