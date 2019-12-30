import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookingComponent} from './pages/user/booking/booking.component';
import {HomeComponent} from './pages/user/home/home.component';
import {ServicesComponent} from './pages/user/services/services.component';
import {ReviewsComponent} from './pages/user/reviews/reviews.component';
import {ApartmentsManagerComponent} from './pages/staff/apartments/apartments-manager.component';
import {BookingManagerComponent} from './pages/staff/booking/booking-manager.component';
import {ServicesManagerComponent} from './pages/staff/services/services.manager.component';
import {TaskManagerComponent} from './pages/staff/tasks/task.manager.component';
import {StaffManagerComponent} from './pages/staff/staff/staff-manager.component';
import {ApartmentsClassesManagerComponent} from './pages/staff/apartments-classes/apartments-classes-manager.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'booking', component: BookingComponent
  },
  {
    path: 'services', component: ServicesComponent
  },
  {
    path: 'reviews', component: ReviewsComponent
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
    path: 'manager/tasks', component: TaskManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
