import gql from 'graphql-tag';

const fragment = gql`
  fragment SelectOpenGraph on OpenGraphEntity {
    idOg
    url
    title
    description
    image
    video
  }
`;

export default fragment;