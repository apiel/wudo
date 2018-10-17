import gql from 'graphql-tag';

import SelectUserTag, { SelectFollower } from '../fragment/userTag';

const template = gql`{
    getFollowers {
        ...SelectFollower
        ...SelectUserTag
    }
}
${SelectUserTag}
${SelectFollower}
`;

export default template;
