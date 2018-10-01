const select = (params = '') => `{
    idUser
    name
    avatarChecksum
    ${params}
}`;
export default select;
