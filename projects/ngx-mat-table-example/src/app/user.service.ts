import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { IDataParams } from 'ngx-mat-table';
import { IUser } from './user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getFakeusersBehaviourRelaySubject = new ReplaySubject<IUser[]>();
  public getFakeusersBehaviourSubject$ = this.getFakeusersBehaviourRelaySubject.asObservable();

  constructor() {}

  public loadUsers(params?: IDataParams): void {
    this.getFakeusersBehaviourRelaySubject.next(this.getFakeUsers(params));
  }

  public getTotalUsers(): Observable<number> {
    return of(users.length);
  }

  private getFakeUsers(params: IDataParams): IUser[] {
    let data: IUser[] = [];

    data = users.filter(
      (c) =>
        ~c.username.toLocaleLowerCase().indexOf(params.filter) ||
        ~c.lastName.toLocaleLowerCase().indexOf(params.filter) ||
        ~c.email.toLocaleLowerCase().indexOf(params.filter)
    );

    data.sort(
      (a, b) => (a[params.sortField] > b[params.sortField] ? 1 : -1) * (params.sortDirection === 'asc' ? 1 : -1)
    );

    return data.slice(params.pageIndex * params.pageSize, (params.pageIndex + 1) * params.pageSize);
  }
}

export const users: IUser[] = [
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
    lastName: 'Kindaroro',
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
