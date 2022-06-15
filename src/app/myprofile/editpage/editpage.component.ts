import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../custom-validators";

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {
  id = this._route.snapshot.params['id'];

  user: any = {};
  userEdit: any = {};
  selectedValue = null;
  numGender: string;
  image: File = null;
  oldImagePath: string;
  UserEditWP: any = {};

  constructor(private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this._authService.getUserById(this.id).subscribe(
        user => {
          this.user = user
          this.oldImagePath = user.imagePath
          console.log(this.id)
          console.log(this.oldImagePath)
        }
      );
    }
  }

  editPageForm = new FormGroup({
    firstnameRef: new FormControl('', Validators.required),
    lastnameRef: new FormControl('', Validators.required),
    dateofbirthRef: new FormControl('', Validators.required),
    emailRef: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    passRef: new FormControl('',
      Validators.compose([Validators.required,
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true
        }),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
            hasSpecialCharacters: true
          }
        ),
        Validators.minLength(8)
      ])
    )
  })

  onSelectProfile() {
    this._router.navigate(['/myprofile', this.id]);
    console.log("Passed id: " + this.id);
  }

  onChangeSelect(newvalue){
    this.numGender = newvalue.target.value;
    if (this.numGender == '1') {
      this.user.gender = 'Male';
      console.log('gender is ' + this.user.gender);
    }
    if (this.numGender == '2') {
      this.user.gender = 'Female';
      console.log('gender is ' + this.user.gender);
    }
  }

  updateProfileData() {
    if (!this.image) {
      this.UserEditWP.firstname = this.user.firstname;
      this.UserEditWP.lastname = this.user.lastname;
      this.UserEditWP.birthday = this.user.birthday;
      this.UserEditWP.gender = this.user.gender;
      this.UserEditWP.imagePath = this.oldImagePath;
      this._authService.putUserByIdWithoutImage(this.id, this.UserEditWP)
        .subscribe(
          res => {
            console.log(res)
            this._router.navigate(['/myprofile', this.id]);
          },
          err => console.log(err)
        )
    }
    else {
      const fdi = new FormData();
      fdi.append('imagePath', this.image, this.image.name)
      fdi.append('firstname', this.user.firstname)
      fdi.append('lastname',  this.user.lastname)
      fdi.append('birthday',  this.user.birthday)
      fdi.append('gender',    this.user.gender)
      console.log(fdi.get("firstname"));
      this._authService.putUserByIdImage(this.id, fdi)
        .subscribe(
          res => {
            console.log(res)
            this._router.navigate(['/myprofile', this.id]);
          },
          err => console.log(err)
        )
    }
  }

  createUser() {
    const fd = new FormData();
    fd.append('imagePath', this.image, this.image.name)
    fd.append('email', this.user.email)
    fd.append('password', this.user.password)
    fd.append('firstname', this.user.firstname)
    fd.append('lastname',  this.user.lastname)
    fd.append('birthday',  this.user.birthday)
    fd.append('gender',    this.user.gender)
    this._authService.createUser(fd)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/myprofile', res._id]);
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
