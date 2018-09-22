import gql from 'graphql-tag';

export const select = `{
    name
}`;

const template = gql`
{
    getMe ${select}
}
`;

export default template;