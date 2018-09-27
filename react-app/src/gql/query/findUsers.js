import gql from 'graphql-tag';

import selectUser from '../select/selectUser';
import selectTag from '../select/selectTag';

const template = gql`
    query FindUsers($search: String!) {
        findUsers (search: $search) ${selectUser(`tags ${selectTag()}`)}
    }
`;

export default template;