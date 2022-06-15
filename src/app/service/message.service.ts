import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _messageUrl = "http://localhost:3000/message/";

  constructor(private http: HttpClient) { }

  sendMessage(message){
    console.log('passed message ' + message)
    return this.http.post<any>(this._messageUrl + 'send', message)
  }
}
