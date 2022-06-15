import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  id = this._route.snapshot.params['id'];

  category: any = [];
  user: any = {};
  userEdit: any = {};
  selectedValue = null;
  numGender: string;
  image: File = null;

  constructor(private _categoryService: CategoryService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this._categoryService.getCategoryById(this.id).subscribe(
        category => {
          this.category = category
          console.log(this.id)
        },
        err => console.log(err)
      );
    }
  }

  goBack() {
    this._router.navigate(['/categories']);
  }

  updateCategoryData() {
    const fd = new FormData();
    fd.append('imagePath', this.image, this.image.name)
    fd.append('name', this.category.name)
    fd.append('details',  this.category.details)
    console.log(fd['name'])
    this._categoryService.putCategoryById(this.id, fd)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/categories']);
        },
        err => console.log(err)
      )
  }

  createCategory() {
    const fd = new FormData();
    fd.append('imagePath', this.image, this.image.name)
    fd.append('name', this.category.name)
    fd.append('details',  this.category.details)
    this._categoryService.createCategory(fd)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/category', res._id])
            .then(() => {
              window.location.reload();
            });
        },
        err => console.log(err)
      )
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];
    }
  }

}
