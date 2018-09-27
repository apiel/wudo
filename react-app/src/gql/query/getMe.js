import gql from 'graphql-tag';

import selectUser from '../select/selectUser';
import selectTag from '../select/selectTag';

export const query = `
    getMe ${selectUser(`tags ${selectTag()}`)}
`;

const template = gql`{ ${query} }`;

export default template;