import gql from 'graphql-tag';

// might look at getFollowers for select

const template = gql`
mutation FollowUserTag($input: FollowUserTagInput!) {
  followUserTag(userTag: $input) {
    accepted
    viewed
    active
  }
}
`;

export default template;