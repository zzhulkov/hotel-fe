import {ConstantsService} from "../../../../services/constants.service";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Staff} from "../../../../component/staff";
import {HttpClient} from "@angular/common/http";
import {Apartments} from "../../../../component/apartments";
import {Booking} from "../../../../component/booking";
import {Task} from "../../../../component/task";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-task-dialog',
  styleUrls: ['../../styles/change-dialog.css'],
  templateUrl: './add-task-dialog.html'
})
export class AddTaskDialogComponent implements OnInit {
  addTaskForm: FormGroup;
  staff = {} as Staff;
  apartment = {} as Apartments;
  task = {} as Task;

  staffList: Staff[];
  selectedCreator: Staff;
  selectedExecutor: Staff;
  apartmentList: Apartments[];
  selectedApartment: Apartments;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.getAllApartment();
    this.getAllAStaff();
  }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group({
      start: [this.task.start,
        Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$')],
      end: [this.task.end,
        Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$')],
      accept: [this.task.accept,
        Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$')],
      complete: [this.task.complete,
        Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$')],
      description: ['', Validators.required],
      taskStatus: [''],
      apartmentRoomNumber: [''],
      staffCreator: [''],
      staffExecutor: ['']
    });
  }

  checkValid() {
    this.addTaskForm.markAllAsTouched();
    console.log('FormGroup: ', this.addTaskForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.addTaskForm.valid;
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      this.setTask();
      this.createTask();
    }
  }

  createTask() {
    this.http.post(URL + 'tasks/', this.task).subscribe(
      res => {
        console.log(res);
        this.task = (res as Task);
      });
  }

  setTask() {
    this.task.creator = this.selectedCreator;
    this.task.executor = this.selectedExecutor;
    this.task.apartment = this.selectedApartment;
    this.task.start = this.addTaskForm.value.start;
    this.task.end = this.addTaskForm.value.end;
    this.task.accept = this.addTaskForm.value.accept;
    this.task.complete = this.addTaskForm.value.complete;
    this.task.description = this.addTaskForm.value.description;
    this.task.status = this.addTaskForm.value.taskStatus;
    console.log(this.task);
  }

  getAllAStaff() {
    this.http.get(URL + 'staff').subscribe(res => {
      console.log(res);
      this.staffList = (res as Staff[]);
    });
  }

  getAllApartment() {
    this.http.get(URL + 'apartments').subscribe(res => {
      console.log(res);
      this.apartmentList = (res as Apartments[]);
    });
  }

  onSelectCreator(staff: Staff): void {
    this.selectedCreator = staff;
  }

  onSelectExecutor(staff: Staff): void {
    this.selectedExecutor = staff;
  }

  onSelectApartment(apartment: Apartments): void {
    this.selectedApartment = apartment;
  }

}
