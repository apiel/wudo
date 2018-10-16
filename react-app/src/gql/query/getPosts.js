import gql from 'graphql-tag';

import selectUser from '../fragment/user';
import selectTag from '../fragment/tag';
import selectOpenGraph from '../fragment/openGraph';

export const select = () => `{
    id
    text
    creationDate
    user { ...SelectUser }
    tags { ...SelectTag }
    openGraph { ...SelectOpenGraph }
}`;

export const fragments = gql`
    ${selectUser}
    ${selectTag}
    ${selectOpenGraph}
`;

const template = gql`
{
    getPosts ${select()}
}

${fragments}
`;

export default template;