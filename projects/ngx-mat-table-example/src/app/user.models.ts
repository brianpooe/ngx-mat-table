export interface IUser {
  _id: number;
  username: string;
  email: string;
  lastName: string;
  dob: Date;
}

export interface IUserResponse {
  total: number;
  users: IUser[];
}
