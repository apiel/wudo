import gql from 'graphql-tag';

import SelectUserTag from '../fragment/userTag';

const template = gql`
mutation FollowUserTag($input: FollowUserTagInput!) {
  followUserTag(userTag: $input) {
    ...SelectUserTag
  }
}
${SelectUserTag}
`;

export default template;