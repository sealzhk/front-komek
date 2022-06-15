import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { DonationService } from 'src/app/service/donation.service';
import { FundraisingService } from 'src/app/service/fundraising.service';

@Component({
  selector: 'app-fundraisings',
  templateUrl: './fundraisings.component.html',
  styleUrls: ['./fundraisings.component.css']
})
export class FundraisingsComponent implements OnInit {
  fundraisings:any = []
  fundraising:any = {}
  constructor(private _fundraisingService: FundraisingService,
              private _categoryService: CategoryService,
              private _donationService: DonationService,
              private _userService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    this._fundraisingService.getFundraisings()
      .subscribe(
        res => {
          this.fundraisings = res;
          for(let i = 0; i < res.length; i++){
            this._categoryService.getCategoryById(res[i].categoryid)
              .subscribe(
                category => {
                  this.fundraisings[i].category = category,
                  console.log('category info ' + this.fundraisings[i].category)
                },
                err  => console.log(err)
              )
            this._userService.getUserById(res[i].userid)
              .subscribe(
                user => {
                  this.fundraisings[i].user = user,
                  console.log('user info ' + this.fundraisings[i].user)
                },
                err => console.log(err)
              )
            this._donationService.getDonationsByFundraising(res[i]._id)
              .subscribe(
                donations => {
                  this.fundraisings[i].donations = donations,
                  console.log('donations info ' + this.fundraisings[i].donations)
                },
                err  => console.log(err)
              )
          }
        },
        err => console.log(err)
      )
  }

  deleteFundraising(id: String){
    if (window.confirm("Are your sure you want to delete this fundraising?")){
      this._fundraisingService.deleteFundraisingById(id)
      .subscribe(
        res => {
          console.log(res)
          this._userService.redirectTo('fundraisings');
        }
      )
    }
  }

  getDate(value){
    let date_ = new Date(value);
    return date_
  }

  getAmount(value){
    return this._fundraisingService.getAmountShort(value);
  }

  getDonationSum(value:any){
    return this._fundraisingService.getAmountShort(this._fundraisingService.getTotal(value))
  }

  activateFundraising(id: String, value: number){
    let mes: String;
    if (value == 1) {
      mes = 'deactivate'
      this.fundraising.active = false
    }
    if (value == 2) {
      mes = 'activate'
      this.fundraising.active = true
    }
    if (window.confirm("Are your sure you want to " + mes + " this fundraising?")){
      this._fundraisingService.putActivateById(id,this.fundraising)
        .subscribe(
          res => { 
            console.log(res)
            this._userService.redirectTo('fundraisings');
          },
          err => console.log(err)
        )
    }
  }

}
