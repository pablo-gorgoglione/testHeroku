interface IUser {
  username: string;
  password: string;
}

interface INote {
  title: string;
  content: string;
  archived: boolean;
  categories: Array<ICategory>;
}

interface ICategory {
  name: string;
}
