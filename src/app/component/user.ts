import {Roles} from './roles.type';

export interface User {
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
