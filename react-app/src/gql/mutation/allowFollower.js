import gql from 'graphql-tag';

// might look at getFollowers for select

const template = gql`
mutation AllowFollower($input: AllowFollowerInput!) {
  allowFollower(userTag: $input) {
    accepted
    viewed
    active
  }
}
`;

export default template;