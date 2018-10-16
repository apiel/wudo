import gql from 'graphql-tag';

import selectUser from '../fragment/user';
import selectTag from '../fragment/tag';

const template = gql`
{
    getMe {
        ...SelectUser
        tags { ...SelectTag }
    }
}

${selectUser}
${selectTag}
`;

export default template;