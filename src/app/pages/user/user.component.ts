import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})

export class UserComponent implements OnInit{

  datesForm: FormGroup;
  currentDate = new Date();
  openBooking = false;
  images: string[] = ['https://q-cf.bstatic.com/images/hotel/max1024x768/306/30607234.jpg',
    'https://www3.hilton.com/resources/media/hi/KBPHIHI/en_US/img/shared/full_page_image_gallery/main/HL_sideext_1270x560_FitToBoxSmallDimension_UpperCenter.jpg',
    'https://www3.hilton.com/resources/media/hi/KBPHIHI/en_US/img/shared/full_page_image_gallery/main/HL_pool01_21_1270x560_FitToBoxSmallDimension_Center.jpg'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.datesForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  onDatesFormClick() {
    this.openBooking = true;
  }

}

