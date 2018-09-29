import gql from 'graphql-tag';

import { select } from '../query/getPosts';

const template = gql`
mutation AddPost($text: String!, $tags: [String!]!, $openGraph: openGraphInput) {
    addPostAndTag(
      post: {
        text: $text
        tags: $tags
        openGraph: $openGraph
      }
    ) ${select()}
}
`;

export default template;