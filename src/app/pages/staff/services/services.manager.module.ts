import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ServicesManagerComponent} from './services.manager.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule
  ],
  declarations: [
    ServicesManagerComponent
  ],
  providers: [HttpService]
})
export class ServicesManagerModule {
}
