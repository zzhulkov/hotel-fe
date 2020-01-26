import {TaskStatus} from './task-status.type';
import {Apartments} from './apartments';
import {Staff} from './staff';

export interface Task {
  id: number;
  start: Date;
  end: Date;
  accept: Date;
  complete: Date;
  description: string;
  status: TaskStatus;
  apartment: Apartments;
  creator: Staff;
  executor: Staff;
}
