import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any = []
  constructor(private _userService: AuthService,
              private _router: Router,
              ) { }

  ngOnInit(): void {
    this._userService.getUsers()
    .subscribe(
      res => this.users = res,
      err => console.log(err)
    )
  }

  deleteUser(id: String){
    if (window.confirm("Are your sure you want to delete?")){
      this._userService.deleteUserById(id)
        .subscribe(
          res => {
            console.log(res)
            this._userService.redirectTo('users');
          }
        )
    }
  }

}
