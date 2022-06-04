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

export interface INote {
  _id: string;
  title: string;
  content: string;
  archived: boolean;
  categories: Array<ICategory>;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  name: string;
  _id: string;
}
export interface NotesState extends BaseState {
  notes: INote[];
  archivedNotes: INote[];
  categories: ICategory[];
}
