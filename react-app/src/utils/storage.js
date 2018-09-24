const STORAGE_TOKEN = 'token';

export const getToken = () => localStorage.getItem(STORAGE_TOKEN);
export const setToken = (token) => localStorage.setItem(STORAGE_TOKEN, token);
