import {ApartmentsClass} from './apartments-class';
import {ApartmentStatus} from "./apartment-status.type";

export interface Apartments {
  id: number;
  roomNumber: number;
  photo: string;
  description: string;
  status: ApartmentStatus;
  apartmentClass: ApartmentsClass;
}
