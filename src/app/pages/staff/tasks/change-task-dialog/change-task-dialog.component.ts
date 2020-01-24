import {ConstantsService} from "../../../../services/constants.service";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {DataTransferService} from "../../../../services/data-transfer.service";
import {DeleteApartmentsClassesDialogComponent} from "../../apartments-classes/components/delete-apartment-class-dialog/delete-apartments-classes-dialog.component";
import {Task} from "../../../../component/task";
import {DeleteTaskDialogComponent} from "../delete-task-dialog/delete-task-dialog.component";
import {Staff} from "../../../../component/staff";
import {Apartments} from "../../../../component/apartments";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;


@Component({
  selector: 'app-change-task-dialog',
  templateUrl: './change-task-dialog.html',
  styleUrls: ['../../styles/change-dialog.css'],
})
export class ChangeTaskDialogComponent implements OnInit {

  changeForm: FormGroup;
  task = {} as Task;

  staffList: Staff[];
  selectedCreator: Staff;
  selectedExecutor: Staff;
  apartmentList: Apartments[];
  selectedApartment: Apartments;


  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private http: HttpClient, dataTransfer: DataTransferService) {
    this.task = dataTransfer.getData();
    this.getAllApartment();
    this.getAllAStaff();
    console.log(this.task);
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      startDate: [this.task.startDate, Validators.required],
      endDate: [this.task.endDate, Validators.required],
      acceptDate: [this.task.acceptDate, Validators.required],
      completeDate: [this.task.completeDate, Validators.required],
      description: [this.task.description, Validators.required],
      taskStatus: [this.task.status, Validators.required],
      apartmentRoomNumber: [this.task.apartment.roomNumber, Validators.required],
      creator: [this.task.creator.lastName, Validators.required],
      executor: [this.task.executor.lastName, Validators.required]
    });

  }

  checkValid() {
    this.changeForm.markAllAsTouched();
    console.log('FormGroup: ', this.changeForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.changeForm.valid;
  }

  onSubmit() {
    if (this.changeForm.valid) {
      this.setTask();
      this.changeTask();
    }
  }

  changeTask() {
    this.http.put(URL + 'tasks/' + this.task.id, this.task).subscribe(
      res => {
        console.log(res);
        this.task = (res as Task);
      });
  }

  setTask() {
    this.task.creator = this.selectedCreator;
    this.task.executor = this.selectedExecutor;
    this.task.apartment = this.selectedApartment;
    this.task.startDate = this.changeForm.value.startDate;
    this.task.endDate = this.changeForm.value.endDate;
    this.task.acceptDate = this.changeForm.value.acceptDate;
    this.task.completeDate = this.changeForm.value.completeDate;
    this.task.description = this.changeForm.value.description;
    this.task.status = this.changeForm.value.taskStatus;
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

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
