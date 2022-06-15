import { HttpClient } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable()
export class FundraisingService {

  private _fundraisingUrl = "http://localhost:3000/fundraising/";
  constructor(private http: HttpClient) { }

  getFundraisings() {
    return this.http.get<any>(this._fundraisingUrl)
  }

  getFundraisingById(id: String){
    console.log('id passed ' + this._fundraisingUrl + id)
    return this.http.get<any>(this._fundraisingUrl + id)
  }

  getFundraisingByCategory(id: String){
    console.log('category id: ' + this._fundraisingUrl + 'category?categoryid=' + id)
    return this.http.get<any>(this._fundraisingUrl + 'category?categoryid=' + id)
  }

  createFundraising(fundraising){
    console.log('passed fundraising ' + fundraising)
    return this.http.post<any>(this._fundraisingUrl + 'create', fundraising)
  }

  putFundraisingById(id: String, fundraising){
    return this.http.put<any>(this._fundraisingUrl + 'edit/' + id, fundraising);
  }

  putActivateById(id: String, fundraising){
    return this.http.put<any>(this._fundraisingUrl + 'activate/' + id, fundraising);
  }

  deleteFundraisingById(id: String) {
    console.log('deleting fundraising ' + id)
    return this.http.get<any>(this._fundraisingUrl + 'delete/' + id);
  }

  // global function to take short version of amount
  getAmountShort(value){
    let mess: String;
    let money = Math.round((value/1000) * 100) / 100;
    if (money < 1000){
      mess = money.toString() + "K";
    } else {
      money = Math.round((value/1000000) * 100) / 100;  
      mess = money.toString() + "m";
    }
    return mess;
  }
  // global function to take time message
  getDateMess(value){
    let mess: String;
    let date_now = new Date().getTime();
    let date_created = new Date(value).getTime();
    let time = date_now - date_created;  //msec
    let minDiff = Math.ceil(time / 60000);
    if (minDiff < 1) {
      mess = "just now"
    }
    else if (minDiff < 60) {
      mess = minDiff.toString() + " min ago"
    }
    else {
      let hoursDiff = Math.ceil(time / (3600 * 1000));
      if (hoursDiff < 24) {
        mess = hoursDiff.toString() + " hours ago"
      } else {
        let dayDiff = Math.ceil(hoursDiff / 24)
        mess = dayDiff.toString() + " days ago"
      }
    }
    return mess;
  }

  // total
  getTotal(value:any){
    let sum: number = 0;
    value.forEach(a => sum += a.donation);
    return sum;
  }
}
