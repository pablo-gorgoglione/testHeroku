export interface IUser {
  username: string;
  password: string;
}

export interface INote {
  title: string;
  content: string;
  archived: boolean;
  categories: Array<ICategory>;
}

export interface ICategory {
  name: string;
}
