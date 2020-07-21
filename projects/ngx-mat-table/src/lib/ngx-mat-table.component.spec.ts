import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatTableComponent } from './ngx-mat-table.component';

describe('NgxMatTableComponent', () => {
  let component: NgxMatTableComponent;
  let fixture: ComponentFixture<NgxMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
