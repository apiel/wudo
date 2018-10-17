import gql from 'graphql-tag';

import SelectUserTag, { SelectFollow } from '../fragment/userTag';

const template = gql`{
    getFollowers {
        ...SelectFollow
        ...SelectUserTag
    }
}
${SelectUserTag}
${SelectFollow()}
`;

export default template;
