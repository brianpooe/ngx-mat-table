import { NgModule } from '@angular/core';
import { NgxMatTableComponent } from './ngx-mat-table.component';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxMatTableComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [NgxMatTableComponent]
})
export class NgxMatTableModule { }
