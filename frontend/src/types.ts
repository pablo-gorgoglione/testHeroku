export interface User {
  username: string;
  id: string;
  token: string;
}

interface BaseState {
  loading: boolean;
  error: string;
}

export interface UserState extends BaseState {
  user: User;
  isLog: boolean;
}

export interface RegisterUserForm extends Omit<User, 'id' | 'token'> {
  password: string;
}
