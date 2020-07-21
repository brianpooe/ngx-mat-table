import { TestBed } from '@angular/core/testing';

import { NgxMatTableService } from './ngx-mat-table.service';

describe('NgxMatTableService', () => {
  let service: NgxMatTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
