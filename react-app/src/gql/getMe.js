import gql from 'graphql-tag';

export const select = `{
    name
    avatar
}`;

const template = gql`
{
    getMe ${select}
}
`;

export default template;