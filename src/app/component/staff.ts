import {User} from './user';
import {Speciality} from "./speciality.type";

export interface Staff {
  id: number;
  speciality: Speciality;
  active: boolean;
  user: User;
}
