import {TaskStatus} from './task-status.type';
import {Apartments} from './apartments';
import {Staff} from './staff';

export interface Task {
  id: number;
  startDate: Date;
  endDate: Date;
  acceptDate: Date;
  completeDate: Date;
  description: string;
  status: TaskStatus;
  apartment: Apartments;
  creator: Staff;
  executor: Staff;
}
