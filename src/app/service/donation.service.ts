import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private _donationUrl = "http://localhost:3000/donation/";

  constructor(private http: HttpClient) { }

  createDonation(donation){
    console.log('passed donation ' + donation)
    return this.http.post<any>(this._donationUrl + 'donate', donation)
  }

  putDonationById(id: String,donation){
    return this.http.put<any>(this._donationUrl + 'edit/' + id, donation);
  }

  getDonations() {
    return this.http.get<any>(this._donationUrl)
  }

  getDonationsByFundraising(id: String){
    console.log('fundraising id: ' + this._donationUrl + 'fundraising?fundraisingid=' + id)
    return this.http.get<any>(this._donationUrl + 'fundraising?fundraisingid=' + id)
  }

  getDonationsByUser(id: String){
    console.log('user id: ' + this._donationUrl + 'user?userid=' + id)
    return this.http.get<any>(this._donationUrl + 'user?userid=' + id)
  }

  getSortedByDateDonations(value:any){
    let sortedDonations = value.map((obj) => {
      return { ...obj, date: new Date(obj.date) };
    })
    sortedDonations = sortedDonations.sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
      );

    for(let i = 0; i < sortedDonations.length; i++){
      if (sortedDonations[i].total == 0){
        sortedDonations.splice(i, 1);
      }
    }
    return sortedDonations;
  }
}
