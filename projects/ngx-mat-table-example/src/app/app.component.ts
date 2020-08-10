import { UserService } from './user.service';
import { IUser, ITableColumn, IConfig, TableActions } from './user.models';
import { Observable, of, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDataParams } from 'dist/ngx-mat-table/lib/models';
import { map } from 'rxjs/operators';

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

  constructor(private readonly userService: UserService) {
    this.initialParams = {
      filter: '',
      pageIndex: 0,
      pageSize: 3,
      sortDirection: 'asc',
      sortField: '_id',
    };
  }

  getTableColumnAndConfig(
    data: Observable<any>,
    config: IConfig[],
    actions: Array<TableActions> = null
  ): Observable<ITableColumn[]> {
    // following objects will contain a specific config parameters
    // based on this params we will change the display of each column
    return data.pipe(
      map((values) => values[0]),
      map((value) => Object.keys(value)),
      map((keys) => {
        let tableColsAndConfig: Array<ITableColumn> = [];
        for (let index = 0; index < keys.length; index++) {
          tableColsAndConfig.push({
            key: keys[index],
            display: config[index].display,
            config: {
              // This column will hold a date value, so we must format the
              // display to show as a date
              format: config[index]?.config?.isDate
                ? config[index].config.format
                : null,
              // in this column we have actions like activate/block account
              // so we will create a button and create it event click
              actions: actions ? config[index]?.config?.actions : null,
            },
          });
        }
        if (actions)
          tableColsAndConfig.push({
            display: 'Action',
            key: 'action',
            config: {
              actions,
            },
          });
        return tableColsAndConfig;
      })
    );
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
    this.tableColumnsAndConfig$ = this.getTableColumnAndConfig(
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

  public onActionHandler(event: any) {
    console.log('onActionHandler: ', event);
  }

  public onSelectedData(event: any) {
    console.log('onSelectedData: ', event);
  }
  public onSelectedHandler(event: any) {
    console.log('onSelectedHandler :>> ', event);
  }

  public onLoadDataHandler(event: IDataParams) {
    this.userService.loadUsers(event);
  }

  public onAdd() {
    console.log('add row');
  }
}
