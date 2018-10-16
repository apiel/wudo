import gql from 'graphql-tag';

import selectUserTag from '../fragment/userTag';

const template = gql`{
    getFollowers {
        ...SelectUserTag
    }
}
${selectUserTag()}
`;

export default template;
