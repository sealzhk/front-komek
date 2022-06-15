import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { FundraisingService } from 'src/app/service/fundraising.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any = []
  category: any = {};

  constructor(private _categoryService: CategoryService,
              private _fundraisingService: FundraisingService,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this._categoryService.getCategories()
    .subscribe(
      res => {
        this.categories = res;
        for(let i = 0; i < res.length; i++){
          this._fundraisingService.getFundraisingByCategory(res[i]._id)
            .subscribe(
              fund => {
                this.categories[i].fundraisings = fund,
                console.log('categ info ' + this.categories[i])
              },
              err  => console.log(err)
            )
        }
      },
      err => console.log(err)
    );
  }

  deleteCategory(id: String){
    if (window.confirm("Are your sure you want to delete this category?")){
      this._categoryService.deleteCategoryById(id)
      .subscribe(
        res => {
          console.log(res)
          this._authService.redirectTo('categories');
        }
      )
    }
  }

  activateCategory(id: String, value: number){
    if (value == 1) {
      this.category.active = false
    }
    if (value == 2) {
      this.category.active = true
    }
    this._categoryService.putActivateById(id,this.category)
      .subscribe(
        res => { 
          console.log(res)
          this._authService.redirectTo('categories');
        },
        err => console.log(err)
      )
  }

}
