import gql from 'graphql-tag';

const fragment = gql`
  fragment SelectTag on TagEntity {
    idTag
    name
  }
`;

export default fragment;