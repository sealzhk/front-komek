import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalalertComponent } from '../modalalert/modalalert.component';
import { AuthService } from '../service/auth.service';
import { DonationService } from '../service/donation.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  id = this._route.snapshot.params['id'];
  fundraising:any = []
  fundraiserUser: any = []
  range = 5;
  checkout:any = 
    {
      donation : 0,
      total    : 0,
      tip      : 0,
    }
  

  constructor(private _fundraisingService: FundraisingService,
              private _authService: AuthService,
              private _route: ActivatedRoute,
              private _donationService: DonationService,
              private _router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    // Getting fundraising data from db
    this._fundraisingService.getFundraisingById(this.id)
      .subscribe(
        res => {
          // get user data from db
          this._authService.getUserById(res.userid)
            .subscribe(
              user => {
                this.fundraiserUser = user
                this.fundraising    = res
                console.log(res.userid)
              }
            );
        },
        err => console.log(err)
      )
    
    this._authService.getUserById(this._authService.getLoggedUser())
      .subscribe(
        res => {
          this.checkout.email   = res.email,
          this.checkout.userid  = res._id,
          this.checkout.donater = res.firstname
        },
        err => console.log(err)
      )
    this.checkout.donation = undefined
  }

  onChangeRange(newvalue){
    this.range = newvalue.target.value
    this.checkout.tip = this.checkout.donation * (this.range / 100)
    this.checkout.total = +this.checkout.donation + +this.checkout.tip
    console.log('range ' + this.range)
  }

  onChangeDonation(newvalue){
    this.checkout.donation = newvalue.target.value
    this.checkout.tip = this.checkout.donation * (this.range / 100)
    this.checkout.total = +this.checkout.donation + +this.checkout.tip
    console.log('donation ' + this.checkout.donation)
  }

  onChangeExpiry(newvalue){
    console.log('expiry ' + newvalue)
    if (this.checkout.expiry.length == 2){
      this.checkout.expiry = this.checkout.expiry + '/'
    }
  }

  onChangeCard(newvalue){
    console.log('card num ' + newvalue.replace(/\s/g, ""))
    let card_num = this.checkout.card_num.replace(/\s/g, "");
    if (card_num.length % 4 == 0 && card_num.length < 16){
      this.checkout.card_num = this.checkout.card_num + " "
    }
  }

  makeDonation(){
    if (this.checkout.donation < 100 || this.checkout.donation === undefined){
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The donation must be at least 100 tenge"
    } else if ((this.checkout.card_num    === undefined ||
                this.checkout.expiry      === undefined || 
                this.checkout.cvv         === undefined ||
                this.checkout.card_holder === undefined) ||
               (this.checkout.card_num.length    == 0 ||
                this.checkout.expiry.length      == 0 || 
                this.checkout.cvv.length         == 0 ||
                this.checkout.card_holder.length == 0 ||
                this.checkout.email.length       == 0 )) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The details of the card are not filled in completely"
    } else {
      this.checkout.fundraisingid = this.id
      this.checkout.card_num = this.checkout.card_num.replace(/\s/g, "")
      if (this.checkout.donater == ""){
        this.checkout.donater = undefined;
      }
      this._donationService.createDonation(this.checkout)
      .subscribe(
        res => { 
          console.log(res)
          this._router.navigate(['/fundraising/' + this.id])
        },
        err => console.log(err)
      )
    }
  }

}
