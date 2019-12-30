import {Roles} from './roles.type';

export class User {
  id: number;
  login: string;
  password: string;
  userRole: Roles;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  points: number;
}
