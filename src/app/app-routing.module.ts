import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApartmentsManagerComponent} from './pages/staff/apartments/apartments-manager.component';
import {BookingManagerComponent} from './pages/staff/booking/booking-manager.component';
import {TaskManagerComponent} from './pages/staff/tasks/task.manager.component';
import {StaffManagerComponent} from './pages/staff/staff/staff-manager.component';
import {UserComponent} from './pages/user/user.component';
import {TaskPageComponent} from "./pages/tasks-page/task-page.component";
import {ApartmentsClassesManagerComponent} from './pages/staff/apartments-classes/apartments-classes-manager.component';
import {UserManagerComponent} from "./pages/staff/user/user-manager.component";
import {ServicesManagerComponent} from "./pages/staff/services/services-manager.component";

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
    path: 'manager/apartments-classes', component: ApartmentsClassesManagerComponent
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
    path: 'manager/users', component: UserManagerComponent
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
