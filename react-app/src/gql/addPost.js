import gql from 'graphql-tag';

import { select } from './getPosts';

const template = gql`
mutation AddPost($text: String!, $tags: [String!]!) {
    addPostAndTag(
      post: {
        text: $text
        tags: $tags
      }
    ) ${select()}
}
`;

export default template;