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

  @Input() public displayedColumns: string[];
  @Input() public total: number;
  @Input() public loading: boolean;
  @Input() public error$: Observable<boolean>;
  @Input() public filterSubject = new Subject<string>();
  @Input() public data: any;
  @Input() public pageSize: number;
  @Input() public pageSizeOptions: string[];

  @Output() loadData: EventEmitter<any> = new EventEmitter<any>();

  public dataSource: MatTableDataSource<any>;
  public defaultSort: Sort = { active: 'role', direction: 'asc' };
  public noData: [];

  private filter: string = "";
  private subscription: Subscription = new Subscription();

  public ngOnInit(): void {
    this.initializeData(this.data);
    if (this.loading) {
      this.dataSource = new MatTableDataSource(this.noData);
    }
  }

  public ngAfterViewInit(): void {
    this.loadDataCall();
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));

    this.subscription.add(merge(filter$, sort$, this.paginator.page).pipe(
      tap(() => this.loadDataCall())
    ).subscribe());
  }

  private loadDataCall(): void {
    this.loadData.emit(JSON.stringify({
      filter: this.filter.toLocaleLowerCase(),
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortDirection: this.sort.direction,
      sortField: this.sort.active
    }))
  }

  private initializeData(data: any[]): void {
    this.dataSource = new MatTableDataSource(data.length ? data : this.noData);
  }
}
