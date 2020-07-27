import { IDataParams, IUser, IUserResponse } from './user.models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  public loadUsers(params?: IDataParams): Observable<IUserResponse> {
    // return this.httpClient.post<Customer[]>("localhost:4200/users", params);
    console.log('params :>> ', params);
    return params
      ? of(this.getFakeUsers(params)).pipe(delay(3000))
      : of({
          total: users.length,
          users,
        });
  }

  private getFakeUsers(params: IDataParams): IUserResponse {
    let data = <IUser[]>[];

    data = users.filter(
      (c) =>
        ~c.username.toLocaleLowerCase().indexOf(params.filter) ||
        ~c.email.toLocaleLowerCase().indexOf(params.filter) ||
        ~c.lastName.toLocaleLowerCase().indexOf(params.filter)
    );

    data.sort(
      (a, b) =>
        (a[params.sortField] > b[params.sortField] ? 1 : -1) *
        (params.sortDirection === 'asc' ? 1 : -1)
    );
    console.log('data from service :>> ', data);
    return {
      total: data.length,
      users: data.slice(
        params.pageIndex * params.pageSize,
        (params.pageIndex + 1) * params.pageSize
      ),
    };
  }
}

export const users = <IUser[]>[
  {
    _id: 1,
    username: 'Abderrahmene',
    email: 'abderrahmene@abc.xyz',
    lastName: 'Jenkins',
    dob: new Date(),
  },
  {
    _id: 2,
    username: 'Mohammed',
    email: 'mohammed@abc.xyz',
    lastName: 'Mohamed',
    dob: new Date(),
  },
  {
    _id: 3,
    username: 'Mustapha',
    email: 'mustapha@abc.xyz',
    lastName: 'Armstrong',
    dob: new Date(),
  },
  {
    _id: 4,
    username: 'Abdelaziz',
    email: 'abdelaziz@abc.xyz',
    lastName: '',
    dob: new Date(),
  },
  {
    _id: 5,
    username: 'Abdelhakim',
    email: 'hakim@abc.xyz',
    lastName: 'Sanders',
    dob: new Date(),
  },
  {
    _id: 6,
    username: 'Ilyes',
    email: 'ilyes@abc.xyz',
    lastName: 'Ferguson',
    dob: new Date(),
  },
  {
    _id: 7,
    username: 'Salim',
    email: 'salim@abc.xyz',
    lastName: 'Rivera',
    dob: new Date(),
  },
  {
    _id: 8,
    username: 'Omar',
    email: 'omar@abc.xyz',
    lastName: 'Morales',
    dob: new Date(),
  },
  {
    _id: 9,
    username: 'Issam',
    email: 'issam@abc.xyz',
    lastName: 'Norris',
    dob: new Date(),
  },
  {
    _id: 10,
    username: 'Osman',
    email: 'osman@abc.xyz',
    lastName: 'Guerrero',
    dob: new Date(),
  },
];
