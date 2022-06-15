import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../service/auth.service';
import { DonationService } from '../service/donation.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-modaldonations',
  templateUrl: './modaldonations.component.html',
  styleUrls: ['./modaldonations.component.css']
})
export class ModaldonationsComponent implements OnInit {

  @Input() id;
  @Input() type;

  loggedID: string;
  userLogged: any = []
  donations:any = []
  fundraising:any = []

  constructor(public activeModal: NgbActiveModal,
              private _donationService: DonationService,
              private _fundraisingService: FundraisingService,
              private _authService: AuthService,
              private _fundService: FundraisingService) {}

  ngOnInit(): void {
    this._donationService.getDonationsByFundraising(String(this.id))
      .subscribe(
        res => this.donations = res,
        err => console.log(err)
      )
    this._fundService.getFundraisingById(this.id)
      .subscribe(
        res => this.fundraising = res,
        err => console.log(err)
      )
    this.loggedID = this._authService.getLoggedUser();
    if (this.loggedID !== undefined) {
      this._authService.getUserById(this.loggedID)
        .subscribe(
          res => this.userLogged = res,
          err => console.log(err)
        )
    }
  }

  getDateAgo(value){
    return this._fundraisingService.getDateMess(value);
  }

  filterDonations(){
    let sorted = this.donations.filter(x => x.total > 0);
    if (String(this.type) == '1'){
      return this.getAllDonations(sorted)
    } else {
      return this.getTopDonations(sorted)
    }
  }

  getAllDonations(donations){
    let sortedDonations = donations.map((obj) => {
      return { ...obj, date: new Date(obj.date) };
    })
    sortedDonations = sortedDonations.sort(
      (a, b) => a.date.getTime() - b.date.getTime() ? -1 : 1
      );

    for(let i = 0; i < sortedDonations.length; i++){
      if (sortedDonations[i].total == 0){
        sortedDonations.splice(i, 1);
      }
    }
    return sortedDonations;
  }

  getTopDonations(donations){
    let sortedDonations = donations.sort((a, b) => (a.donation > b.donation) ? -1 : 1);
    sortedDonations = sortedDonations.filter(x => x.donation >= 100000)
    return sortedDonations;
  }

}
