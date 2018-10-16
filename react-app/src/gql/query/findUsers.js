import gql from 'graphql-tag';

import selectUser from '../fragment/user';
import selectTag from '../fragment/tag';

const template = gql`
query FindUsers($search: String!) {
    findUsers (search: $search) {
        ...SelectUser
        tags { ...SelectTag }
    }
}

${selectUser}
${selectTag}
`;

export default template;