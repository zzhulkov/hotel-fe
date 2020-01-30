import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApartmentsManagerComponent} from './pages/staff/apartments/apartments-manager.component';
import {BookingManagerComponent} from './pages/staff/booking/booking-manager.component';
import {ServicesManagerComponent} from './pages/staff/services/services.manager.component';
import {TaskManagerComponent} from './pages/staff/tasks/task.manager.component';
import {StaffManagerComponent} from './pages/staff/staff/staff-manager.component';
import {UserComponent} from './pages/user/user.component';
import {TaskPageComponent} from "./pages/tasks-page/task-page.component";

const routes: Routes = [
  {
    path: 'home', component: UserComponent
  },
  {
    path: 'task-page', component: TaskPageComponent
  },
  {
    path: 'manager/apartments', component: ApartmentsManagerComponent
  },
  {
    path: 'manager/booking', component: BookingManagerComponent
  },
  {
    path: 'manager/services', component: ServicesManagerComponent
  },
  {
    path: 'manager/staff', component: StaffManagerComponent
  },
  {
    path: 'manager/tasks', component: TaskManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
