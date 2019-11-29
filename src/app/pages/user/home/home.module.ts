import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home.component';
import {HttpService} from '../../../http.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [HttpService]
})
export class HomeModule {
}
