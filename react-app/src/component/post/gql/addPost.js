import gql from 'graphql-tag';

const template = gql`
mutation AddPost($text: String!, $tags: [String!]!) {
    addPostAndTag(
      post: {
        text: $text
        tags: $tags
      }
    ) {
      idPost
      text
      creationDate
      user {
          name
      }
      tags {
          name
          idTag
      }
    }
}
`;

export default template;