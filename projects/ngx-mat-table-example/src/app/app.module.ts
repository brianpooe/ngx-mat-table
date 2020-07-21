import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMatTableModule } from 'ngx-mat-table';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxMatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
