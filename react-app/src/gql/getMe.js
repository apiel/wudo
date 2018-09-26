import gql from 'graphql-tag';

import selectUser from './select/selectUser';
import selectTag from './select/selectTag';

const template = gql`
{
    getMe ${selectUser(`tags ${selectTag()}`)}
}
`;

export default template;