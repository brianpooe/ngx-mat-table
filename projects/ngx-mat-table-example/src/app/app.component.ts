import { IUser, ITableColumn } from './models';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;
  public data$: Observable<IUser[]>
  public tableColumnsAndConfig$: Observable<ITableColumn[]>
  public pageSize$: Observable<number>;
  public pageSizeOptions$: Observable<number[]>;
  public total$: Observable<number>;

  constructor() {

    this.loading$ = of(false);
    this.error$ = of(false);
    this.data$ = of([
      {
        _id: 1,
        username: "Abderrahmene",
        email: "abderrahmene@abc.xyz",
        dob: new Date(),
      },
      {
        _id: 2,
        username: "Mohammed",
        email: "mohammed@abc.xyz",
        dob: new Date()
      },
      {
        _id: 3,
        username: "Mustapha",
        email: "mustapha@abc.xyz",
        dob: new Date()
      },
      {
        _id: 4,
        username: "Abdelaziz",
        email: "abdelaziz@abc.xyz",
        dob: new Date()
      },
      {
        _id: 5,
        username: "Abdelhakim",
        email: "hakim@abc.xyz",
        dob: new Date()
      },
      {
        _id: 6,
        username: "Ilyes",
        email: "ilyes@abc.xyz",
        dob: new Date()
      },
      {
        _id: 7,
        username: "Salim",
        email: "salim@abc.xyz",
        dob: new Date()

      },
      {
        _id: 8,
        username: "Omar",
        email: "omar@abc.xyz",
        dob: new Date()
      },
      {
        _id: 9,
        username: "Issam",
        email: "issam@abc.xyz",
        dob: new Date()

      },
      {
        _id: 10,
        username: "Osman",
        email: "osman@abc.xyz",
        dob: new Date()

      }
    ]);
    this.tableColumnsAndConfig$ = of([
      { key: "_id", display: "User Id" },
      { key: "username", display: "Username" },
      { key: "email", display: "Email" },
      // following objects will contain a specific config parameters
      // based on this params we will change the display of each column
      {
        key: "dob",
        display: "Date of Birth",
        // This column will hold a date value, so we must format the
        // display to show as a date
        config: {
          isDate: true,
          format: "dd MMM yy"
        }
      },
      {
        key: "action",
        display: "Action",
        // in this column we have actions like activate/block account
        // so we will create a button and create it event click
        config: {
          isAction: true,
          actions: ["check", "delete", "edit"]
        }
      }
    ]);
    this.pageSize$ = of(10);
    this.pageSizeOptions$ = of([3, 5, 10]);
    this.total$ = of(10);
  }

  public onActionHandler(event: any) {
    console.log('onActionHandler: ', event);
  }

}
