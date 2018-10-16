import gql from 'graphql-tag';

import selectUser from '../fragment/user';
import selectTag from '../fragment/tag';

const template = gql`
mutation googleAuth($tokenId: String!) {
  googleAuth(token: $tokenId) {
    type
    user {
      ...SelectUser
      tags { ...SelectTag }
    }
  }
}

${selectUser}
${selectTag}
`; // need to use select from getMe

export default template;