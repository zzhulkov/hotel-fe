export class Booking {
  id: number;
  startDate: Date;
  endDate: Date;
  comments: string;
  status: string;
  bookedBy: string;
  createdDate: Date;
  review: string;
  totalPrice: number;

  constructor(
    id: number,
    startDate: Date,
    endDate: Date,
    comments: string,
    status: string,
    bookedBy: string,
    createdDate: Date,
    review: string,
    totalPrice: number
  ) {
    this.id = id;
    this.startDate = this.startDate;
    this.endDate = this.endDate;
    this.comments = this.comments;
    this.status = status;
    this.bookedBy = bookedBy;
    this.createdDate = createdDate;
    this.review = review;
    this.totalPrice = totalPrice;
  }
}
