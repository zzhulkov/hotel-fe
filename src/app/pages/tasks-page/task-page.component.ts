import {Component} from "@angular/core";
import {AuthenticationService} from "../../modules/authentication/authentication.service";
import {LoginFormComponent} from "../../modules/authentication/login-form/login-form.component";
import {Task} from "../../component/task";
import {HttpClient} from "@angular/common/http";
import {TaskStatus} from "../../component/task-status.type";

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent {

  canAccess = false;
  workerTasks: Task[];

  constructor(private auth: AuthenticationService, private http: HttpClient) {
    this.auth.currentUserObservable
      .subscribe(
        data => {
          if (data !== null) {
            if (data.userRole === 'Worker'
              || data.userRole === 'Manager'
              || data.userRole === 'Administrator'
            ) {
              this.canAccess = true;
            }
          }
          this.getTasks();
        }
      );
  }

  accept(id: number) {
    this.changeTaskStatus(id, 'Started');
  }

  cancel(id: number) {
    this.changeTaskStatus(id, 'Canceled');
  }

  finish(id: number) {
    this.changeTaskStatus(id, 'Complete');
  }

  changeTaskStatus(id: number, newStatus: string) {
    this.http.patch('http://localhost:8090/tasks/' + id, {status: newStatus})
      .subscribe(
        data => {
          this.workerTasks
            .find((v: Task, i: number, obj: Task[]) => {
              return v.id === id;
            }).status = (newStatus as TaskStatus);
          console.log('newSrrr');
        },
        error1 => {
          console.log(error1);
        }
      );
  }

  getTasks() {
    if (this.canAccess) {
      this.http.get('http://localhost:8090/tasks?executor=' + this.auth.currentUserObject.id)
        .subscribe(
          (data: Task[]) => {
            this.workerTasks = data
              .sort((a: Task, b: Task) => {
                return a.end === b.end ? 0 : a.end > b.end ? -1 : 1;
              });
          },
          error1 => {
            console.log(error1);
          }
        );
    }
  }
}
