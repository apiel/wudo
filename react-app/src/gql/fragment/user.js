import gql from 'graphql-tag';

const fragment = gql`
  fragment SelectUser on UserEntity {
    idUser
    name
    avatarChecksum
  }
`;

export default fragment;