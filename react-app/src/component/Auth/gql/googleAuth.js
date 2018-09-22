import gql from 'graphql-tag';

const template = gql`
mutation googleAuth($tokenId: String!) {
  googleAuth(token: $tokenId) {
    jwt
    email
    name
    type
  }
}
`;

export default template;