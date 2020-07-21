import { NgModule } from '@angular/core';
import { NgxMatTableComponent } from './ngx-mat-table.component';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [NgxMatTableComponent],
  imports: [
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [NgxMatTableComponent]
})
export class NgxMatTableModule { }
