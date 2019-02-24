import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostcodeService } from './services/postcode.service';
import { HttpClientModule } from '@angular/common/http';
import { RangeListComponent } from './range/range-list/range-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RangeListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PostcodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
