export interface IUser {
  username: string;
  password: string;
}

export interface INote {
  title: string;
  content: string;
  archived: boolean;
  categories: Array<String>;
  userId: string;
}

export interface ICategory {
  name: string;
  userId: string;
}
