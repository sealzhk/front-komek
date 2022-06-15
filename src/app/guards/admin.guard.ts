import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnInit {
  userRole: String
  loggedID: String
  constructor(private _authService: AuthService,
              private _router: Router) {}
  ngOnInit(){
    this.loggedID = this._authService.getLoggedUser();
    if (this.loggedID !== undefined) {
      this._authService.getUserById(this.loggedID)
        .subscribe(
          res => this.userRole = res.userRole,
          err => console.log(err)
        )
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // let userRole: String 
    // this.loggedID = this._authService.getLoggedUser();
    // if (this.loggedID !== undefined) {
    //   console.log('admin')
    //   this._authService.getUserById(this.loggedID)
    //     .subscribe(
    //       res => {
    //         this.userRole = String(res.userRole),
    //         console.log('hhhhhh ' + res.userRole)
    //       },
    //       err => console.log(err)
    //     )
    // }
    console.log('rollee ' + this.userRole)
    if (this._authService.loggedIn() && this.userRole == '1') {
      return true
    } else {
      // this._router.navigate([''])
      return false
    }
  }
  
}
