import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { DonationService } from '../service/donation.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fundraisings:any = []
  categories:any = []
  donations:any = []
  sum: number = 0;
  constructor(private _fundraisingService: FundraisingService,
              private _categoryService: CategoryService,
              private _donationService: DonationService,
              private _router: Router) { }

  ngOnInit(){
    this._fundraisingService.getFundraisings()
      .subscribe(
        res => this.fundraisings = res,
        err => console.log(err)
      )
    this._categoryService.getCategories()
      .subscribe(
        res => this.categories = res,
        err => console.log(err)
      )
    this._donationService.getDonations()
      .subscribe(
        res => this.donations = res,
        err => console.log(err)
      )
  }

  getAmount(value){
    return this._fundraisingService.getAmountShort(value);
  }

  getDonationSum(id: String){
    console.log("get donation of " + id)
    let sortedDonations = this.donations.filter(x => x.fundraisingid == id);
    return this._fundraisingService.getAmountShort(this._fundraisingService.getTotal(sortedDonations))
  }

  getLastDonationDate(id: String){
    let sortedDonations = this.donations.filter(x => x.fundraisingid == id);
    if (sortedDonations.length > 0) {
      let lastDonation    = this._donationService.getSortedByDateDonations(sortedDonations).pop();
      return this._fundraisingService.getDateMess(lastDonation.date);
    } else {
      return "-"
    }
  }

  getTotalPercent(id: String, amount_goal: String){
    let sortedDonations = this.donations.filter(x => x.fundraisingid == id);
    let total = this._fundraisingService.getTotal(sortedDonations)
    let range = (Number(total) * 100) / Number(amount_goal);
    console.log('range ' + range)
    return range;
  }

  filterFundraisings(){
    let sortedFundraisings = this.fundraisings.sort((a, b) => (a.amount_goal > b.amount_goal) ? -1 : 1);
    sortedFundraisings = this.fundraisings.filter(x => x.active);
    return sortedFundraisings;
  }

}
