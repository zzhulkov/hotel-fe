import {ApartmentsClass} from './apartments-class';

export interface ApartmentPrice {
  id: number;
  price: number;
  startPeriod: Date;
  endPeriod: Date;
  apartmentClass: ApartmentsClass;
}
