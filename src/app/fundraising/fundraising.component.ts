import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalcontactComponent } from '../modalcontact/modalcontact.component';
import { ModaldonationsComponent } from '../modaldonations/modaldonations.component';
import { AuthService } from '../service/auth.service';
import { CategoryService } from '../service/category.service';
import { DonationService } from '../service/donation.service';
import { FundraisingService } from '../service/fundraising.service';


@Component({
  selector: 'app-fundraising',
  templateUrl: './fundraising.component.html',
  styleUrls: ['./fundraising.component.css']
})
export class FundraisingComponent implements OnInit {
  id = this._route.snapshot.params['id'];
  fundraising:any = []
  donations: any = []
  user: any = []
  firstName: String;
  lastName: String;
  category: String;
  getUser = false;
  loggedID: string;
  userLogged: any = []

  constructor(private _fundraisingService: FundraisingService,
              private _router: Router,
              private _route: ActivatedRoute,
              public  _authService: AuthService,
              private _categoryService: CategoryService,
              private _donationService: DonationService,
              private modalService: NgbModal) { }

  ngOnInit(){
    // Getting fundraising data from db
    this._fundraisingService.getFundraisingById(this.id)
      .subscribe(
        res => {
          // get user data from db
          this._authService.getUserById(res.userid)
            .subscribe(
              user => {
                this.firstName = user.firstname;
                this.lastName  = user.lastname;
                console.log(res.userid)
              }
            );
          // get category data from db
          this._categoryService.getCategoryById(res.categoryid)
            .subscribe(
              categ => {
                this.category = categ.name;
                console.log(categ.name);
              }
            );
          this.fundraising = res; 
        },
        err => console.log(err)
      )
    this._donationService.getDonationsByFundraising(this.id)
      .subscribe(
        res => this.donations = res,
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

  getAmount(value){
    return this._fundraisingService.getAmountShort(value);
  }

  getDateAgo(value){
    return this._fundraisingService.getDateMess(value);
  }

  getCurrentTotal(){
    return this._fundraisingService.getAmountShort(this._fundraisingService.getTotal(this.donations));
  }

  getTopDonation(){
    let sortedDonations = this.donations.sort((a, b) => (a.donation > b.donation) ? -1 : 1);
    return sortedDonations[0];
  }

  getFirstDonation(){
    return this._donationService.getSortedByDateDonations(this.donations)[0];
  }

  getResentDonation(){
    return this._donationService.getSortedByDateDonations(this.donations).pop();
  }

  filterComment(){
    return this.donations.filter(x => x.comment.length > 0 && x.total > 0);
  }

  getTotalPercent(){
    let range = (Number(this._fundraisingService.getTotal(this.donations)) * 100) / Number(this.fundraising.amount_goal);
    console.log('range ' + range)
    return range;
  }

  onDonate(id: String){
    this._router.navigate(['/donate', id]);
    console.log("Passed id: " + id);
  }

  open(type){
    const modalRef = this.modalService.open(ModaldonationsComponent);
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.type = type;
  }

  contact(id){
    const modalRef = this.modalService.open(ModalcontactComponent);
    modalRef.componentInstance.id = id
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
            this._authService.redirectTo('');
          },
          err => console.log(err)
        )
    }
  }

}
