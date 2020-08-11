import { UserService } from './user.service';
import { IUser } from './user.models';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IDataParams } from 'dist/ngx-mat-table/lib/models';
import {
  NgxMatTableService,
  ITableColumn,
  IActionResponse,
  ACTION_TYPES,
} from 'ngx-mat-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;
  public data$: Observable<IUser[]>;
  public tableColumnsAndConfig$: Observable<ITableColumn[]>;
  public pageSize: number;
  public pageSizeOptions: number[];
  public total$: Observable<number>;
  public showAddBtn: boolean;
  public showSearch: boolean;
  private initialParams: IDataParams;

  constructor(
    private readonly userService: UserService,
    private readonly ngxMatTableService: NgxMatTableService
  ) {
    this.initialParams = {
      filter: '',
      pageIndex: 0,
      pageSize: 3,
      sortDirection: 'asc',
      sortField: '_id',
    };
  }

  //tableData
  ngOnInit(): void {
    this.userService.loadUsers(this.initialParams);
    this.data$ = this.userService.getFakeusersBehaviourSubject;
    this.total$ = this.userService.getTotalUsers();
    this.loading$ = of(false);
    this.error$ = of(false);
    this.pageSize = 3;
    this.pageSizeOptions = [3, 5, 10];
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

  public onActionHandler(event: IActionResponse) {
    switch (event.type) {
      case ACTION_TYPES.EDIT:
        console.log('action edit :>> ', event.payload);
        break;
      case ACTION_TYPES.DELETE:
        console.log('action delete :>> ', event.payload);
        break;
      case ACTION_TYPES.GOT_TO:
        console.log('action go to :>> ', event.payload);

      default:
        break;
    }
  }

  public onLoadDataHandler(event: IDataParams) {
    this.userService.loadUsers(event);
  }

  public onAddTriggerHandler() {
    console.log('add row');
  }
}
