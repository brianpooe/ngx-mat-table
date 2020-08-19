import { UserService } from './user.service';
import { IUser } from './user.models';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IDataParams } from 'dist/ngx-mat-table/lib/models';
import { NgxMatTableService, ITableColumn, IActionResponse, ACTION_TYPES } from 'ngx-mat-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public loading$: Observable<boolean>;
  public error$: Observable<any>;
  public data$: Observable<IUser[]>;
  public tableColumnsAndConfig$: Observable<ITableColumn[]>;
  public pageSize$: Observable<number>;
  public pageSizeOptions$: Observable<number[]>;
  public total$: Observable<number>;
  public showAddBtn: boolean;
  public showSearch: boolean;
  private initialParams: IDataParams;

  constructor(private readonly userService: UserService, private readonly ngxMatTableService: NgxMatTableService) {
    this.initialParams = {
      filter: '',
      pageIndex: 0,
      pageSize: 3,
      sortDirection: 'asc',
      sortField: '_id',
    };
  }

  ngOnInit(): void {
    this.userService.loadUsers(this.initialParams);
    this.data$ = this.userService.getFakeusersBehaviourSubject$;
    this.total$ = this.userService.getTotalUsers();
    this.loading$ = of(false);
    this.error$ = of(null);
    // this.error$ = of({ error: 'Error' });
    this.pageSize$ = of(3);
    this.pageSizeOptions$ = of([3, 5, 10]);
    this.showAddBtn = true;
    this.showSearch = true;
    this.tableColumnsAndConfig$ = this.ngxMatTableService.setTableConfig(
      this.data$,
      [
        { display: 'User Id' },
        { display: 'Username' },
        { display: 'Email' },
        { display: 'Last Name' },
        {
          display: 'Date of Birth',
          config: {
            isDate: true,
            format: 'dd MMM yy',
          },
        },
      ],
      ['edit', 'delete', 'goTo']
    );
  }

  public onActionHandler(event: IActionResponse): void {
    switch (event.type) {
      case ACTION_TYPES.EDIT:
        console.log('action edit :>> ', event.payload);
        break;
      case ACTION_TYPES.DELETE:
        console.log('action delete :>> ', event.payload);
        break;
      case ACTION_TYPES.GOT_TO:
        console.log('action go to :>> ', event.payload);
        break;
      default:
        console.log('invalid selection');
        break;
    }
  }

  public onLoadDataHandler(event: IDataParams): void {
    this.userService.loadUsers(event);
  }

  public onAddTriggerHandler(): void {
    console.log('add row');
  }
}
