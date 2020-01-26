import {ConstantsService} from "../../../../services/constants.service";
import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {Unsubscribable} from "../../../../component/Unsubscribable";
import {DataTransferService} from "../../../../services/data-transfer.service";
import {MatPaginator} from "@angular/material/paginator";
import {Booking} from "../../../../component/booking";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Task} from "../../../../component/task";
import {MatTableDataSource} from '@angular/material/table';
import {takeUntil} from 'rxjs/operators';

const URL = new ConstantsService().BASE_URL;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'task-table-component',
  styleUrls: ['../../styles/table.css'],
  templateUrl: 'task-table.html',
})
export class TaskTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @Output() selectedRowClicked: EventEmitter<any> = new EventEmitter();
  @Output() reselectRow: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  taskList = new MatTableDataSource<Task>();
  selectedTask: Task;
  displayedColumns = ['start', 'end', 'accept', 'complete', 'description', 'status', 'apartmentsRoomNumber', 'creatorLastName', 'executorLastName'];
  dataSource = this.taskList;
  startDateFilter = new FormControl('');
  endDateFilter = new FormControl('');
  acceptDateFilter = new FormControl('');
  completeDateFilter = new FormControl('');
  descriptionFilter = new FormControl('');
  statusFilter = new FormControl('');
  apartmentsRoomNumberFilter = new FormControl('');
  creatorFilter = new FormControl('');
  executorFilter = new FormControl('');

  filterValues = {
    start: '',
    end: '',
    accept: '',
    complete: '',
    description: '',
    status: '',
    apartmentsRoomNumber: '',
    creatorLastName: '',
    executorLastName: ''
  };

  private dataTransfer: DataTransferService;
  selectedRow: any;

  constructor(private http: HttpClient, dataTransfer: DataTransferService) {
    super();
    this.getAllTask();
    this.dataTransfer = dataTransfer;
    this.taskList.filterPredicate = this.createFilter();
  }

  selectRow(row: any): void {
    this.reselectRow.emit();
    this.selectedRow = row.description;
    console.log(row);
    this.dataTransfer.setData(row);
    this.isSelected();
  }

  isSelected() {
    this.selectedRowClicked.emit();
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  ngOnInit() {
    this.startDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        start => {
          this.filterValues.start = start;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.endDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        end => {
          this.filterValues.end = end;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.acceptDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        accept => {
          this.filterValues.accept = accept;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.completeDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        complete => {
          this.filterValues.complete = complete;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.descriptionFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        description => {
          this.filterValues.description = description;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.statusFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        status => {
          this.filterValues.status = status;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.apartmentsRoomNumberFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        apartmentsRoomNumber => {
          this.filterValues.apartmentsRoomNumber = apartmentsRoomNumber;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.creatorFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        creatorLastName => {
          this.filterValues.creatorLastName = creatorLastName;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.executorFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        executorLastName => {
          this.filterValues.executorLastName = executorLastName;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAllTask = () => {
    this.http.get(URL + 'tasks/').subscribe(res => {
      console.log(res);
      this.dataSource.data = (res as Task[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line:only-arrow-functions
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.startDate.toString().toLowerCase().indexOf(searchTerms.startDate) !== -1
        && data.endDate.toString().toLowerCase().indexOf(searchTerms.endDate) !== -1
        && data.acceptDate.toString().toLowerCase().indexOf(searchTerms.acceptDate) !== -1
        && data.completeDate.toString().toLowerCase().indexOf(searchTerms.completeDate) !== -1
        && data.description.toLowerCase().indexOf(searchTerms.description) !== -1
        && data.status.toLowerCase().indexOf(searchTerms.status) !== -1
        && data.apartment.roomNumber.toString().toLowerCase().indexOf(searchTerms.apartmentsRoomNumber) !== -1
        && data.creator.user.lastname.toLowerCase().indexOf(searchTerms.creator) !== -1
        && data.executor.user.lastname.toLowerCase().indexOf(searchTerms.executor) !== -1;
    };
    return filterFunction;
  }

}
