import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { NgxMatTableComponent } from './ngx-mat-table.component';

@NgModule({
  declarations: [NgxMatTableComponent],
  imports: [CommonModule, MaterialModule],
  exports: [NgxMatTableComponent],
})
export class NgxMatTableModule {}
