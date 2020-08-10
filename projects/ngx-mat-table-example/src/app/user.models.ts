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

export interface IConfig {
  display: string;
  config?: ITableConfig;
}

export interface ITableConfig {
  isDate?: boolean;
  format?: string;
  actions?: Array<TableActions>;
}

export type TableActions = 'edit' | 'delete' | 'goTo';

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
