import {Roles} from './roles.type';

export interface User {
  id: number;
  login: string;
  password: string;
  userRole: Roles;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  points: number;
}
