export interface IUser {
    _id: number;
    username: string;
    email: string;
    dob: Date;
}

export interface ITableColumn {
    key: string;
    display: string;
    config?: ITableConfig
}

export interface ITableConfig {
    isDate?: boolean;
    format?: string;
    isAction?: boolean;
    actions?: string[];
}