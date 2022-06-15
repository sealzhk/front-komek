import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  id = this._route.snapshot.params['id'];
  userData: any = []
  isExist: boolean;
  userRole: number;
  LoggedUserId: String;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._authService.getUserById(this.id).subscribe(
      user => {
        this.userData = user
        console.log(this.id)
        if (this.userData.imagePath) {
          console.log("yes");
          this.isExist = true;
        }
        else {
          console.log("no");
          this.isExist = false;
        }
      }
    )
    this.LoggedUserId = this._authService.getLoggedUser();
    this._authService.getUserById(this.LoggedUserId).subscribe(
      user => {
        this.userRole = user.userRole
        console.log('userrole ' + this.userRole)
      },
      err => console.log(err)
    )

  }

  onEdit() {
    this._router.navigate(['/editpage', this.id]);
    console.log("Passed id: " + this.id);
  }

  onChangePass() {
    this._router.navigate(['/changepass', this.id]);
    console.log("Passed id: " + this.id);
  }

  onDonations() {
    this._router.navigate(['/mydonations', this.id]);
    console.log("Passed id: " + this.id);
  }

  onFundraisings() {
    this._router.navigate(['/myfundraisings', this.id]);
    console.log("Passed id: " + this.id);
  }
}
