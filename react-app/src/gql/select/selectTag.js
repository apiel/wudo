const select = (params = '') => `{
    idTag
    name
    ${params}
}`;
export default select;
