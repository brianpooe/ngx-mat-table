import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxMatTableService {
  private _getFakeusersBehaviourSubject = new BehaviorSubject<any[]>([]);
  public getFakeusersBehaviourSubject = this._getFakeusersBehaviourSubject.asObservable();

  constructor() {}

  public loadUsers(): void {}
}
