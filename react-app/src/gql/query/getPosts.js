import gql from 'graphql-tag';

import selectUser from '../select/selectUser';
import selectTag from '../select/selectTag';
import selectOpenGraph from '../select/selectOpenGraph';

export const select = () => `{
    idPost
    text
    creationDate
    user ${selectUser()}
    tags ${selectTag()}
    openGraph ${selectOpenGraph()}
}`;

const template = gql`
{
    getPosts ${select()}
}
`;

export default template;