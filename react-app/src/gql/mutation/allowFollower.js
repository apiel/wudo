import gql from 'graphql-tag';

import SelectUserTag from '../fragment/userTag';

const template = gql`
mutation AllowFollower($input: AllowFollowerInput!) {
  allowFollower(userTag: $input) {
    ...SelectUserTag
  }
}
${SelectUserTag}
`;

export default template;