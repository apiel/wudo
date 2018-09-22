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
`;

export default template;