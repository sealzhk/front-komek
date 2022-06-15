import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { DonationService } from 'src/app/service/donation.service';
import { FundraisingService } from 'src/app/service/fundraising.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
  donations:any = []

  constructor(private _fundraisingService: FundraisingService,
              private _donationService: DonationService,
              private _userService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    this._donationService.getDonations()
      .subscribe(
        res => {
          this.donations = res;
          for(let i = 0; i < res.length; i++){
            this._fundraisingService.getFundraisingById(res[i].fundraisingid)
              .subscribe(
                fundraising => {
                  this.donations[i].fundraising = fundraising,
                  console.log('fundraising info ' + this.donations[i].fundraising)
                },
                err  => console.log(err)
              )
            this._userService.getUserById(res[i].userid)
              .subscribe(
                user => {
                  this.donations[i].user = user,
                  console.log('user info ' + this.donations[i].user)
                },
                err => console.log(err)
              )
          }
        },
        err => console.log(err)
      )
  }

  annulDonation(id: String) {
    const fd = new FormData();
    fd.append('total', "0")
    fd.append('donation', "0")
    fd.append('tip', "0")
    if (window.confirm("Are your sure you want to annul this donation?")){
      this._donationService.putDonationById(id,fd)
        .subscribe(
          res => { 
            console.log(res)
            this._userService.redirectTo('donations');
          },
          err => console.log(err)
        )
    }
  }

  getDate(value){
    let date_ = new Date(value);
    return date_
  }


}
