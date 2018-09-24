const select = (params = '') => `{
    idUser
    name
    avatar
    ${params}
}`;
export default select;
