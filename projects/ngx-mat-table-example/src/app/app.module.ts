import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMatTableModule, NgxMatTableService } from 'ngx-mat-table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxMatTableModule, BrowserAnimationsModule],
  providers: [NgxMatTableService],
  bootstrap: [AppComponent],
})
export class AppModule {}
