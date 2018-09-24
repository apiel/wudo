import gql from 'graphql-tag';

import selectUser from './select/selectUser';

const template = gql`
mutation googleAuth($tokenId: String!) {
  googleAuth(token: $tokenId) {
    jwt
    type
    user ${selectUser()}
  }
}
`; // need to use select from getMe

export default template;