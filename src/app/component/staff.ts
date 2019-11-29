import {User} from './user';

export class Staff extends User {
  id: number;
  user: User;
  speciality: string;
  active: boolean;
}
