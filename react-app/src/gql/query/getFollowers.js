import gql from 'graphql-tag';

import SelectUserTag, { SelectFollower } from '../fragment/userTag';

const template = gql`{
    getFollowers {
        ...SelectFollow
        ...SelectUserTag
    }
}
${SelectUserTag}
${SelectFollower}
`;

export default template;
