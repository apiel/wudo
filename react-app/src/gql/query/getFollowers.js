import gql from 'graphql-tag';

import select from '../select/selectUserTag';

export const query = `
  getFollowers ${select}
`;

const template = gql`{ ${query} }`;

export default template;
