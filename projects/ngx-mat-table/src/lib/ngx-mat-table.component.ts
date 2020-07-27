import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, merge, Subject, Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TITLES } from './constants';

@Component({
  selector: 'ngx-mat-table',
  templateUrl: './ngx-mat-table.component.html',
})
export class NgxMatTableComponent {
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

  public noData: [];
  public dataSource: MatTableDataSource<any>;
  private subscription: Subscription = new Subscription();

  public ngOnInit(): void {
    this.subscription.add(
      this.data$.subscribe((data) => this.initializeData(data))
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

  public retry(): void {}

  emitAction(event: any) {
    this.onActionHandler.emit(event);
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
