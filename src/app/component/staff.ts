import {User} from './user';

export interface Staff extends User {
  id: number;
  speciality: string;
  active: boolean;
}
