export interface IDataParams {
  filter: string;
  sortDirection: 'asc' | 'desc' | '';
  sortField: string;
  pageIndex: number;
  pageSize: number;
}

export interface IAction {
  actionType: string;
  actionPayload: any;
}
