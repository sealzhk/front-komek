import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../custom-validators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  regirstrForm = new FormGroup({
      firstnameRef: new FormControl('', Validators.required),
      lastnameRef: new FormControl('', Validators.required),
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
      ),
      confPassRef: new FormControl('', Validators.required)
    },
    CustomValidators.mustMatch('passRef', 'confPassRef'));

  registerUserData: any = {}
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res.user_id),
          localStorage.setItem('token', res.token),
          localStorage.setItem('user_id', res.user_id),
          this._auth.redirectTo('/')
        },
        err => console.log(err)
      )
  }

}
