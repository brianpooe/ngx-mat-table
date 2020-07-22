import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public cols = [
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
        actions: ["delete", "update"]
      }
    }
  ];

  public USERS_DATA = [
    {
      _id: 1,
      username: "Abderrahmene",
      email: "abderrahmene@abc.xyz",
      dob: Date.now(),
    },
    {
      _id: 2,
      username: "Mohammed",
      email: "mohammed@abc.xyz",
      dob: Date.now(),
      actif: false
    },
    {
      _id: 3,
      username: "Mustapha",
      email: "mustapha@abc.xyz",
      dob: Date.now(),
    },
    {
      _id: 4,
      username: "Abdelaziz",
      email: "abdelaziz@abc.xyz",
      dob: Date.now(),
    },
    {
      _id: 5,
      username: "Abdelhakim",
      email: "hakim@abc.xyz",
      dob: Date.now(),
    },
    {
      _id: 6,
      username: "Ilyes",
      email: "ilyes@abc.xyz",
      dob: Date.now(),
    },
    {
      _id: 7,
      username: "Salim",
      email: "salim@abc.xyz",
      dob: Date.now(),
      actif: false
    },
    {
      _id: 8,
      username: "Omar",
      email: "omar@abc.xyz",
      dob: Date.now(),
    },
    {
      _id: 9,
      username: "Issam",
      email: "issam@abc.xyz",
      dob: Date.now(),
      actif: false
    },
    {
      _id: 10,
      username: "Osman",
      email: "osman@abc.xyz",
      dob: Date.now(),
      actif: false
    }
  ];

  public loading: boolean;
  public pageSizeOptions: number[];
  public pageSize: number;
  public total: number;

  constructor() {
    this.pageSize = 10;
    this.pageSizeOptions = [3, 5, 10];
    this.loading = false;
    this.total = 10;
  }

  public onActionHandler(event: any) {
    console.log('onActionHandler event', event);
  }
}
