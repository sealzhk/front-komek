import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  userData: any = []
  userID: string;
  checkingPass: any = {};
  userPass: any = {};
  oldPassword: string;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userID = this._authService.getLoggedUser();
    this._authService.getUserById(this.userID).subscribe(
      user => {
        this.oldPassword = user.password;
        console.log(this.oldPassword)
      }
    )
  }

  onSelectProfile() {
    this.userID = this._authService.getLoggedUser();
    this._router.navigate(['/myprofile', this.userID]);
    console.log("Passed id: " + this.userID);
  }

  updatePasswordData() {
    console.log(this.checkingPass.oldPass + ' ' + this.oldPassword + ' ' + this.checkingPass.newPass + ' ' + this.checkingPass.newPassAgain);
    if (this.checkingPass.oldPass == this.oldPassword &&
        this.checkingPass.newPass == this.checkingPass.newPassAgain) {
      this.userPass.password = this.checkingPass.newPass;
      this._authService.putUserPassById(this.userID, this.userPass)
        .subscribe(
          res => {
            console.log(res)
            this._router.navigate(['/myprofile', this.userID]);
          },
          err => console.log(err)
        )
    }
    else {
      console.log('old password is not correct and new passwords not matched');
    }
  }

}
