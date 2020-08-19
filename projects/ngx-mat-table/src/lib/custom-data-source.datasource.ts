import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export class CustomDataSource implements DataSource<any> {
  private dataSubject = new BehaviorSubject<any>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private hasDataSubject = new BehaviorSubject<any>(false);
  private errorSubject = new BehaviorSubject<any>(null);
  private pageSizeSubject = new BehaviorSubject<number>(0);
  private pageSizeOptionsSubject = new BehaviorSubject<Array<number>>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  public hasData$ = this.hasDataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public pageSize$ = this.pageSizeSubject.asObservable();
  public pageSizeOptions$ = this.pageSizeOptionsSubject.asObservable();
  public total$ = this.totalSubject.asObservable();
  public dataTest$ = this.dataSubject.asObservable();

  constructor(
    private data: Observable<any>,
    private loading: Observable<boolean>,
    private error: Observable<any>,
    private pageSize: Observable<number>,
    private pageSizeOptions: Observable<Array<number>>,
    private total: Observable<number>
  ) {}

  loadDataFromCustomDataSource(): void {
    this.data
      .pipe(
        tap((data) => {
          if (data.length) {
            this.hasDataSubject.next(true);
          }
        })
      )
      .subscribe((data) => this.dataSubject.next(data));
    this.loading.subscribe((loading) => this.loadingSubject.next(loading));
    this.error.subscribe((error) => this.errorSubject.next(error));
    this.pageSize.subscribe((pageSize) => this.pageSizeSubject.next(pageSize));
    this.pageSizeOptions.subscribe((pageSizeOptions) => this.pageSizeOptionsSubject.next(pageSizeOptions));
    this.total.subscribe((total) => this.totalSubject.next(total));
  }

  connect(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
    this.hasDataSubject.complete();
    this.errorSubject.complete();
    this.pageSizeSubject.complete();
    this.pageSizeOptionsSubject.complete();
    this.totalSubject.complete();
  }
}
