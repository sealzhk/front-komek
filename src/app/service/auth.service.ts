import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _profilesUrl = "http://localhost:3000/profiles/"

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._profilesUrl + 'register', user)
  }

  loginUser(user) {
    return this.http.post<any>(this._profilesUrl + 'login', user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    this._router.navigate(['/signin'])
  }

  getUsers() {
    return this.http.get<any>(this._profilesUrl)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getLoggedUser(){
    return localStorage.getItem('user_id')
  }

  getUserById(id: String){
    console.log('userid passed ' + this._profilesUrl + id)
    return this.http.get<any>(this._profilesUrl + id)
  }

  createUser(user){
    console.log('passed user ' + user)
    return this.http.post<any>(this._profilesUrl + 'create', user)
  }

  deleteUserById(id: String) {
    console.log('deleting user ' + id)
    return this.http.get<any>(this._profilesUrl + 'delete/' + id);
  }

  putUserByIdImage(id: String, user){
    return this.http.put<any>(this._profilesUrl + 'editpageimage/' + id, user);
  }

  putUserByIdWithoutImage(id: String, user){
    return this.http.put<any>(this._profilesUrl + 'editpagewithoutimage/' + id, user);
  }

  putUserPassById(id: String, user){
    return this.http.put<any>(this._profilesUrl + 'changepass/' + id, user);
  }

  getUserDonations(id: String) {
    return this.http.get<any>(this._profilesUrl + 'mydonations/' + id);
  }

  getUserFundraisings(id: String) {
    return this.http.get<any>(this._profilesUrl + 'myfundraisings/' + id);
  }

  redirectTo(url:string){
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this._router.navigate([url]));
 }

}
