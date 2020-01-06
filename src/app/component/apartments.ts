import {ApartmentsClass} from './apartments-class';

export interface Apartments {
  id: number;
  roomNumber: number;
  photo: string;
  description: string;
  status: string;
  apartmentClass: ApartmentsClass;
}
