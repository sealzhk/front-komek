import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalalertComponent } from '../modalalert/modalalert.component';
import { AuthService } from '../service/auth.service';
import { CategoryService } from '../service/category.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrls: ['./fundraiser.component.css']
})
export class FundraiserComponent implements OnInit {
  id = this._route.snapshot.params['id'];
  fundraiser:any = {};
  selectedObject:any = {};
  categories:any = [];
  image: File = null;
  selectedValue = null;
  constructor(private _fundraisingService: FundraisingService,
              private _categoryService: CategoryService,
              private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this._categoryService.getCategories()
      .subscribe(
        res => this.categories = res,
        err => console.log(err)
      );
    if (this.id !== undefined) {
      this._fundraisingService.getFundraisingById(this.id)
        .subscribe(
          res => this.fundraiser = res,
          err => console.log(err)
        )
    }
  }

  filterCategories(){
    return this.categories.filter(x => x.active);
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];
    }
  }

  onChangeSelect(newvalue){
    this.fundraiser.categoryid = newvalue.target.value
    console.log("new val " + newvalue.target.value)
  }

  onChangeCard(newvalue){
    console.log('card num ' + newvalue.replace(/\s/g, ""))
    let card_num = this.fundraiser.card_num.replace(/\s/g, "");
    if (card_num.length % 4 == 0 && card_num.length < 16){
      this.fundraiser.card_num = this.fundraiser.card_num + " "
    }
  }

  createFundraising() {
    if (this.fundraiser.title === undefined || this.fundraiser.title.length == 0){
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The title is not filled in"
    } else if (this.fundraiser.details === undefined || this.fundraiser.details.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The details are not filled in"
    } else if (this.fundraiser.categoryid === undefined || this.fundraiser.categoryid.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The category is not selected in"
    } else if (this.fundraiser.city === undefined || this.fundraiser.city.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The city is not filled in"
    } else if (this.fundraiser.amount_goal === undefined || this.fundraiser.amount_goal < 10000) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The amount of goal must be at least 10000 tenge"
    } else if (this.fundraiser.card_num === undefined || this.fundraiser.card_num.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The details of the card are not filled in completely"
    } else {
      this.fundraiser.card_num = this.fundraiser.card_num.replace(/\s/g, "")
      const fd = new FormData();
      fd.append('imagePath', this.image, this.image.name)
      fd.append('userid', this._authService.getLoggedUser())
      fd.append('title', this.fundraiser.title)
      fd.append('details', this.fundraiser.details)
      fd.append('categoryid', this.fundraiser.categoryid)
      fd.append('city', this.fundraiser.city)
      fd.append('amount_goal', this.fundraiser.amount_goal)
      fd.append('card_num', this.fundraiser.card_num)
      this._fundraisingService.createFundraising(fd)
      .subscribe(
        res => { 
          console.log(res)
          this._router.navigate(['/fundraising/' + res._id])
        },
        err => console.log(err)
      )
    }
  }

  updateFundraising(){
    if (this.fundraiser.title === undefined || this.fundraiser.title.length == 0){
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The title is not filled in"
    } else if (this.fundraiser.details === undefined || this.fundraiser.details.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The details are not filled in"
    } else if (this.fundraiser.categoryid === undefined || this.fundraiser.categoryid.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The category is not selected in"
    } else if (this.fundraiser.city === undefined || this.fundraiser.city.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The city is not filled in"
    } else if (this.fundraiser.amount_goal === undefined || this.fundraiser.amount_goal < 10000) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The amount of goal must be at least 10000 tenge"
    } else if (this.fundraiser.card_num === undefined || this.fundraiser.card_num.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The details of the card are not filled in completely"
    } else {
        this.fundraiser.card_num = this.fundraiser.card_num.replace(/\s/g, "")
        const fd = new FormData();
        fd.append('imagePath', this.image, this.image.name)
        fd.append('title', this.fundraiser.title)
        fd.append('details', this.fundraiser.details)
        fd.append('categoryid', this.fundraiser.categoryid)
        fd.append('city', this.fundraiser.city)
        fd.append('amount_goal', this.fundraiser.amount_goal)
        fd.append('card_num', this.fundraiser.card_num)
        fd.append('card_holder', this.fundraiser.card_holder)
        this._fundraisingService.putFundraisingById(this.fundraiser._id,fd)
        .subscribe(
          res => { 
            console.log(res)
            this._router.navigate(['/fundraising/' + res._id])
          },
          err => console.log(err)
        )
      }
  }
}