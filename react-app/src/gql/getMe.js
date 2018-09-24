import gql from 'graphql-tag';

import selectUser from './select/selectUser';

const template = gql`
{
    getMe ${selectUser()}
}
`;

export default template;