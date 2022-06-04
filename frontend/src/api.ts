import axios from 'axios';
import { INote, RegisterUserForm, User } from './types';

const http = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
});
const apiUrl = 'https://ensolvers-pablo-gorgoglione.herokuapp.com/api';
// const apiUrl = 'http://localhost:4000/api';
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
    const res = await http.get(`${userEndPoint}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    // }
  },
};

const notesEndPoint = `${apiUrl}/notes`;

export const notesApi = {
  getNotes: async (token: string): Promise<INote[]> => {
    const res = await http.get(`${notesEndPoint}/`, {
      headers: { Authorization: token },
    });
    return res.data;
  },

  postNote: async (token: string, note: INote): Promise<INote> => {
    const { content, title } = note;
    const res = await http.post(
      `${notesEndPoint}/`,
      { title, content },
      {
        headers: { Authorization: token },
      }
    );
    return res.data;
  },

  putNote: async (id: string, token: string, note: INote): Promise<INote> => {
    const { content, title, archived } = note;
    const res = await http.put(
      `${notesEndPoint}/${id}`,
      { title, content, archived },
      {
        headers: { Authorization: token },
      }
    );
    return res.data;
  },

  deleteNote: async (id: string, token: string): Promise<INote> => {
    const res = await http.delete(`${notesEndPoint}/${id}`, {
      headers: { Authorization: token },
    });
    return res.data;
  },

  getNotesArchived: async (token: string): Promise<INote[]> => {
    const res = await http.get(`${notesEndPoint}/archived`, {
      headers: { Authorization: token },
    });
    return res.data;
  },
};
