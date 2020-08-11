export interface IUser {
  _id: number;
  username: string;
  email: string;
  lastName: string;
  dob: Date;
  gender: string;
}

export interface IUserResponse {
  total: number;
  users: IUser[];
}
