import gql from 'graphql-tag';

const template = gql`
mutation googleAuth($tokenId: String!) {
  googleAuth(token: $tokenId) {
    jwt
    type
    user {
      name
    }
  }
}
`; // need to use select from getMe

export default template;