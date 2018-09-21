import gql from 'graphql-tag';

const template = gql`
{
    getPosts {
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
    }
}
`;

export default template;