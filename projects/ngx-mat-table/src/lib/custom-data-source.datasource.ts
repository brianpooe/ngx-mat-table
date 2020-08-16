import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';

export class CustomDataSource implements DataSource<any> {
  private dataSubject = new BehaviorSubject<any>([]);

  constructor(private data: Observable<any>) {}

  loadDataFromCustomDataSource(): void {
    this.data.subscribe((data) => !!data && this.dataSubject.next(data));
  }

  connect(): Observable<any[]> {
    console.log('Connecting data source');
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
  }
}
