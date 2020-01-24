import {ApartmentsClass} from './apartments-class';
import {User} from './user';
import {Apartments} from './apartments';
import {BookingStatus} from "./booking-status.type";

export interface Booking {
  id: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  comment: string;
  createdDate: Date;
  review: string;
  bookingStatus: BookingStatus;
  user: User;
  apartmentsClass: ApartmentsClass;
  apartments: Apartments;
}
