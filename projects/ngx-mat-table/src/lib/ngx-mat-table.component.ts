import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, merge, Subject, Subscription, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IDataParams } from './models';
import { CustomDataSource } from './custom-data-source.datasource';

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
  @Output() onSelectedHandler = new EventEmitter();
  @Output() onLoadDataHandler = new EventEmitter<IDataParams>();

  @ViewChild('input') input: ElementRef;

  public noData: [];
  public dataSource: CustomDataSource;
  public filterSubject = new Subject<string>();
  public defaultSort: Sort = { active: '_id', direction: 'asc' };

  private subscription: Subscription = new Subscription();
  private filter: string = '';

  public ngOnInit(): void {
    this.dataSource = new CustomDataSource(this.data$);
    this.dataSource.loadDataFromCustomDataSource();
  }

  public ngAfterViewInit(): void {
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.subscription.add(
      merge(filter$, this.sort.sortChange, this.paginator.page)
        .pipe(
          tap(() => {
            this.emitloadData();
          })
        )
        .subscribe()
    );
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

  emitAction(event: any) {
    this.onActionHandler.emit(event);
  }
  emitSelected(event: any) {
    this.onSelectedHandler.emit(event);
  }
  public retry(): void {
    this.emitloadData();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
