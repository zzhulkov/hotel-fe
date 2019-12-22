import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpService} from './http.service';
import {StaffModule} from './pages/staff/staff.module';
import {UserModule} from './pages/user/user.module';
import {ConstantsService} from './services/constants.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    AppRoutingModule,
    StaffModule,
    UserModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [HttpService, ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
