export interface IDataParams {
  filter: string;
  sortDirection: 'asc' | 'desc' | '';
  sortField: string;
  pageIndex: number;
  pageSize: number;
}

export interface IActionResponse {
  type: string;
  payload: any;
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
  isAction?: boolean;
  actions?: Array<TableActions>;
}

export type TableActions = 'edit' | 'delete' | 'goTo';

export enum ICON_ENUM {
  EDIT = 'edit',
  DELETE = 'delete',
  GOT_TO = 'arrow_forward',
}

export enum ACTION_TYPES {
  EDIT = 'edit',
  DELETE = 'delete',
  GOT_TO = 'goTo',
}

export interface IDataParams {
  filter: string;
  sortDirection: 'asc' | 'desc' | '';
  sortField: string;
  pageIndex: number;
  pageSize: number;
}
