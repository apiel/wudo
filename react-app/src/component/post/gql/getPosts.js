import gql from 'graphql-tag';

export const select = `{
    idPost
    text
    creationDate
    user {
        name
    }
    tags {
        name
        idTag
    }
}`;

const template = gql`
{
    getPosts ${select}
}
`;

export default template;