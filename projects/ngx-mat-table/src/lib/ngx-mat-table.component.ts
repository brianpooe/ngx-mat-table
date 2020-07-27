import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, merge, Subject, Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TITLES } from './constants';
import { IDataParams } from './models';

@Component({
  selector: 'ngx-mat-table',
  templateUrl: './ngx-mat-table.component.html',
})
export class NgxMatTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input('loading') public loading$: Observable<boolean>;
  @Input('error') public error$: Observable<boolean>;
  @Input('data') data$: Observable<any[]>;
  @Input('tableColumnsAndConfig') tableCols$: Observable<any[]>;
  @Input('pageSize') public pageSize$: Observable<number>;
  @Input('pageSizeOptions') public pageSizeOptions$: Observable<number[]>;
  @Input('total') public total$: Observable<number>;
  @Output() onActionHandler = new EventEmitter();
  @Output() onLoadDataHandler = new EventEmitter<IDataParams>();

  public noData: [];
  public dataSource: MatTableDataSource<any>;
  public filterSubject = new Subject<string>();
  public defaultSort: Sort = { active: '_id', direction: 'asc' };

  private subscription: Subscription = new Subscription();
  private filter: string = '';

  public ngOnInit(): void {
    this.subscription.add(
      this.data$.subscribe((data) => {
        console.log('data from library :>> ', data);
        this.initializeData(data);
      })
    );
    this.subscription.add(
      this.loading$.subscribe((loading) => {
        if (loading) this.dataSource = new MatTableDataSource(this.noData);
      })
    );
  }

  // We will need this getter to exctract keys from tableCols
  get keys() {
    let returningKeys = [];
    this.subscription.add(
      this.tableCols$.subscribe((cols) => {
        cols.map(({ key }) => returningKeys.push(key));
      })
    );
    return returningKeys;
  }

  public ngAfterViewInit(): void {
    this.emitloadData();
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    );

    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.emitloadData()))
        .subscribe()
    );
  }

  public retry(): void {
    this.emitloadData();
  }

  emitAction(event: any) {
    this.onActionHandler.emit(event);
  }

  emitloadData(): void {
    this.onLoadDataHandler.emit({
      filter: this.filter.toLocaleLowerCase(),
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortDirection: this.sort.direction,
      sortField: this.sort.active,
    });
  }

  public changeTitle(title: string): string {
    if (title === TITLES.CHECK) return TITLES.SELECT;
    return title;
  }

  private initializeData(data: any[]): void {
    this.dataSource = new MatTableDataSource(data.length ? data : this.noData);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
