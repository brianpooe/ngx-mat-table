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
import { IActionResponse, IDataParams, ACTION_TYPES, ICON_ENUM } from './models';
import { CustomDataSource } from './custom-data-source.datasource';

@Component({
  selector: 'ngx-mat-table',
  templateUrl: './ngx-mat-table.component.html',
  styleUrls: ['./ngx-mat-table.component.css'],
})
export class NgxMatTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  @Input('loading') public loading$: Observable<boolean>;
  @Input('error') public error$: Observable<boolean>;
  @Input('data') public data$: Observable<any[]>;
  @Input('tableColumnsAndConfig') public tableCols$: Observable<any[]>;
  @Input('pageSize') public pageSize: number;
  @Input('pageSizeOptions') public pageSizeOptions: number[];
  @Input('total') public total$: Observable<number>;
  @Input() public showAddBtn = true;
  @Input() public showSearch = true;

  @Output() onActionHandler = new EventEmitter();
  @Output() onAddTriggerHandler = new EventEmitter();
  @Output() onLoadDataHandler = new EventEmitter<IDataParams>();

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
    const filter$ = this.filterSubject.pipe(
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

  emitAction(actionType: string, actionPayload: any): void {
    const event: IActionResponse = {
      type: actionType,
      payload: actionPayload,
    };
    this.onActionHandler.emit(event);
  }

  add(): void {
    this.onAddTriggerHandler.emit();
  }

  public retry(): void {
    this.emitloadData();
  }

  // We will need this getter to exctract keys from tableCols
  get keys(): Array<string> {
    const returningKeys = [];
    this.subscription.add(this.tableCols$.subscribe((cols) => cols.map(({ key }) => returningKeys.push(key))));
    return returningKeys;
  }

  public showIcon(action: string): string {
    switch (action) {
      case ACTION_TYPES.EDIT:
        return ICON_ENUM.EDIT;
      case ACTION_TYPES.DELETE:
        return ICON_ENUM.DELETE;
      case ACTION_TYPES.GOT_TO:
        return ICON_ENUM.GOT_TO;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
