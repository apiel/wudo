import gql from 'graphql-tag';

import selectUser from '../select/selectUser';
import selectTag from '../select/selectTag';

const template = gql`
mutation googleAuth($tokenId: String!) {
  googleAuth(token: $tokenId) {
    type
    user ${selectUser(`tags ${selectTag()}`)}
  }
}
`; // need to use select from getMe

export default template;