export interface IUser {
  _id: number;
  username: string;
  email: string;
  lastName: string;
  dob: Date;
  gender: string;
}

export interface ITableColumn {
  key: string;
  display: string;
  config?: ITableConfig;
}

export interface ITableConfig {
  isDate?: boolean;
  format?: string;
  isAction?: boolean;
  actions?: string[];
}

export interface IDataParams {
  filter: string;
  sortDirection: 'asc' | 'desc' | '';
  sortField: string;
  pageIndex: number;
  pageSize: number;
}

export interface IUserResponse {
  total: number;
  users: IUser[];
}
