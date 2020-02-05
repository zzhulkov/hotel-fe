import {NgModule} from "@angular/core";
import {TaskPageComponent} from "./task-page.component";
import {MatTabsModule} from '@angular/material/tabs';
import {AuthenticationFormsModule} from "../../modules/authentication/authentication-forms.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpService} from "../../http.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material";
import {AnimationsModule} from "../../modules/animations/animations.module";

@NgModule({
  imports: [
    MatTabsModule,
    AuthenticationFormsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    AnimationsModule
  ],
  declarations: [TaskPageComponent],
  exports: [TaskPageComponent],
  providers: [
    HttpService
  ]
})
export class TaskPageModule {
}
