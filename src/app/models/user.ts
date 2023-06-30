export interface IUser {
  email: string;
  password: string;
}

export interface IUserInfo extends IUser {
  token: string;
}
