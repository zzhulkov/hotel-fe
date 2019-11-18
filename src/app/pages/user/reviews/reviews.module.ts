import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ReviewsComponent} from './reviews.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule
  ],
  declarations: [
    ReviewsComponent
  ],
  providers: [HttpService]
})
export class ReviewsModule {
}
