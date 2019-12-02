import {ApartmentsClass} from './apartments-class';
import {User} from './user';
import {Apartments} from './apartments';

export class Booking {
  id: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  comment: string;
  createdDate: Date;
  review: string;
  bookingStatus: string;
  user: User;
  apartmentsClass: ApartmentsClass
  apartments: Apartments;
}
