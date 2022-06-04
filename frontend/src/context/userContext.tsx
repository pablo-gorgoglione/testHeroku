import Cookies from 'universal-cookie';
import userReducer from './userReducer';
import { RegisterUserForm, User, UserState } from '../types';
import { userApi } from '../api';
import { createContext, useEffect, useReducer } from 'react';

interface IUserContext {
  userState: UserState;
  login: (username: string, password: string) => Promise<boolean>;
  register: (user: RegisterUserForm) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const INITIAL_USER: User = {
  username: '',
  id: '',
  token: '',
};

const INITIAL_STATE: UserState = {
  loading: false,
  error: '',
  user: INITIAL_USER,
  isLog: false,
};
interface props {
  children: JSX.Element | JSX.Element[];
}

export const UserProdiver = ({ children }: props) => {
  const [userState, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const cookies = new Cookies();
  let token = cookies.get('token');

  useEffect(() => {
    const checkIfTokenIsValid = async () => {
      try {
        dispatch({ type: 'SET_LOADING' });
        const user = await userApi.getOne(token.split(' ')[1]);
        dispatch({ type: 'SET_USER', payload: { ...user, token } });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error trying to login' });
      }
    };

    if (token) {
      checkIfTokenIsValid();
    }
  }, [token]);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const user = await userApi.login(username, password);
      cookies.set('token', 'Bearer ' + user.token);
      dispatch({ type: 'SET_USER', payload: user });
      return true;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error trying to login.' });
      return false;
    }
  };

  const register = async (user: RegisterUserForm): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await userApi.register(user);
      dispatch({ type: 'SET_USER', payload: res });
      return true;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error trying to register' });
      return false;
    }
  };

  const logout = () => {
    try {
      cookies.remove('token');
      dispatch({ type: 'RESET' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error trying to logout' });
    }
  };
  return (
    <UserContext.Provider value={{ userState, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
