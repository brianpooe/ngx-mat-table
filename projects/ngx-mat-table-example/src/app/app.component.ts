import { UserService } from './user.service';
import { IUser, ITableColumn } from './user.models';
import { Observable, of, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDataParams } from 'dist/ngx-mat-table/lib/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;
  public data$: Observable<IUser[]>;
  public tableColumnsAndConfig$: Observable<ITableColumn[]>;
  public pageSize$: Observable<number>;
  public pageSizeOptions$: Observable<number[]>;
  public total$: Observable<number>;
  private subscription: Subscription = new Subscription();

  constructor(private readonly userService: UserService) {
    this.loading$ = of(false);
    this.error$ = of(false);
    this.tableColumnsAndConfig$ = of([
      { key: '_id', display: 'User Id' },
      { key: 'username', display: 'Username' },
      { key: 'email', display: 'Email' },
      { key: 'lastName', display: 'Last Name' },
      // following objects will contain a specific config parameters
      // based on this params we will change the display of each column
      {
        key: 'dob',
        display: 'Date of Birth',
        // This column will hold a date value, so we must format the
        // display to show as a date
        config: {
          isDate: true,
          format: 'dd MMM yy',
        },
      },
      {
        key: 'action',
        display: 'Action',
        // in this column we have actions like activate/block account
        // so we will create a button and create it event click
        config: {
          isAction: true,
          actions: ['check', 'delete', 'edit'],
        },
      },
    ]);
    this.pageSize$ = of(10);
    this.pageSizeOptions$ = of([3, 5, 10]);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.userService.loadUsers().subscribe((userResponse) => {
        this.data$ = of(userResponse.users);
        this.total$ = of(userResponse.total);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onActionHandler(event: any) {
    console.log('onActionHandler: ', event);
  }
  public onLoadDataHandler(event: IDataParams) {
    this.userService.loadUsers(event);
  }
}
