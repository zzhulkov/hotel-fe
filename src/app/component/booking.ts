import {User} from './user';
import {ApartmentClass} from './apartmentClass';
import {Apartment} from './apartment';

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
  apartmentClass: ApartmentClass
  apartment: Apartment;
}
