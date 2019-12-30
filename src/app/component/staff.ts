import {User} from './user';
import {Roles} from './roles.type';

/*TODO change class to interface
 */
export class Staff extends User {
  id: number;
  speciality: string;
  active: boolean;
}
