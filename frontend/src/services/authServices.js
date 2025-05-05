import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

export const register = (data) => axios.post(`${BASE_URL}/register`, data);
export const login = (data) => axios.post(`${BASE_URL}/login`, data);

