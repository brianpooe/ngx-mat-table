import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';

export class CustomDataSource implements DataSource<any> {
  private dataSubject = new BehaviorSubject<any>([]);

  constructor(private data: Observable<any>) {}

  loadDataFromCustomDataSource() {
    this.data.subscribe((tap) => this.dataSubject.next(tap));
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    console.log('Connecting data source');
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }
}
