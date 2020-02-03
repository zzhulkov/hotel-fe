import {Apartments} from './apartments';

export interface UnavailableApartment {
  id: number;
  startDate: Date;
  endDate: Date;
  causeDescription: string;
  apartment: Apartments;
}
