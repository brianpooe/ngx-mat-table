import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, merge, Subject, Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ngx-mat-table',
  templateUrl: './ngx-mat-table.component.html',
})
export class NgxMatTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output("onActionHandler") emitter = new EventEmitter();
  @Input("data") dataSource: any[];
  @Input("cols") tableCols: any[];
  @Input() public total: number;
  @Input() public loading: boolean;
  @Input() public pageSize: number;
  @Input() public pageSizeOptions: number[];

  @Input() public filterSubject = new Subject<string>();

  @Input('error') public error$: Observable<boolean>;

  public noData: [];

  public ngOnInit(): void {
  }

  // We will need this getter to exctract keys from tableCols
  get keys() {
    return this.tableCols?.map(({ key }) => key)
  }

  public retry(): void { }

  emitAction(event: any) {
    this.emitter.emit(event);
  }
}
