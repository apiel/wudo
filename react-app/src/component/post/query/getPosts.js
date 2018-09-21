import gql from 'graphql-tag';

const query = gql`
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

export default query;