import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userID: string;
  categories:any = []
  user: any = []

  constructor(public _authService: AuthService,
              public _categoryService: CategoryService,
              private _router: Router) { }

  ngOnInit(): void {
    this.userID = this._authService.getLoggedUser();
    this._categoryService.getCategories()
      .subscribe(
        res => this.categories = res,
        err => console.log(err)
      )
    this._authService.getUserById(this.userID)
      .subscribe(
        res => this.user = res,
        err => console.log(err)
      )
    
  }

  onSelectProfile() {
    this.userID = this._authService.getLoggedUser();
    this._router.navigate(['/myprofile', this.userID]);
    console.log("Passed id: " + this.userID);
  }

}
