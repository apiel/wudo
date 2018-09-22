import gql from 'graphql-tag';

import selectUser from './selectUser';

const template = gql`
{
    getMe ${selectUser}
}
`;

export default template;