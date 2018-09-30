import gql from 'graphql-tag';

import select from '../select/selectUserTag';
import selectTag from '../select/selectTag';

export const query = `
  getTagsFollowed ${select({ followedParams: `tags ${selectTag()}` })}
`;

const template = gql`{ ${query} }`;

export default template;
