const select = (params = '') => `{
    idOg
    url
    title
    description
    image
    video
    ${params}
}`;
export default select;
