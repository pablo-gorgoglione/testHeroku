import axios from 'axios';
import { RegisterUserForm, User } from './types';

const http = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
});
const apiUrl = 'https://ensolvers-pablo-gorgoglione.herokuapp.com/api';
const userEndPoint = `${apiUrl}/users`;
export const userApi = {
  login: async (username: string, password: string): Promise<User> => {
    const res = await http.post(`${userEndPoint}/login`, {
      username,
      password,
    });
    return res.data;
  },
  register: async (user: RegisterUserForm): Promise<User> => {
    const res = await http.post(`${userEndPoint}/`, user);
    return res.data;
  },
  getOne: async (token: string): Promise<User> => {
    console.log(token);
    const res = await http.get(`${userEndPoint}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
