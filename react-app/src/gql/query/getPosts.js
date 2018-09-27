import gql from 'graphql-tag';

import selectUser from '../select/selectUser';
import selectTag from '../select/selectTag';

export const select = () => `{
    idPost
    text
    creationDate
    user ${selectUser()}
    tags ${selectTag()}
}`;

const template = gql`
{
    getPosts ${select()}
}
`;

export default template;