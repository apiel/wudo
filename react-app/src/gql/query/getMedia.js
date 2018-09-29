import gql from 'graphql-tag';

const template = gql`
query Ogs($url: String!) {
    ogs(url: $url) {
        error
        title
        description
        image
        video
    }
}
`;

export default template;