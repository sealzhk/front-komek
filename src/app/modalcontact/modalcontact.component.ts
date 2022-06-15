import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalalertComponent } from '../modalalert/modalalert.component';
import { AuthService } from '../service/auth.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-modalcontact',
  templateUrl: './modalcontact.component.html',
  styleUrls: ['./modalcontact.component.css']
})
export class ModalcontactComponent implements OnInit {
  @Input() id;
  
  message:any = {};
  loggedID: String;
  constructor(public activeModal: NgbActiveModal,
              private _authService: AuthService,
              private _messageService: MessageService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this._authService.getUserById(this.id)
      .subscribe(
        res => {
          this.message.to       = res._id,
          this.message.receiver = res.firstname + " " + res.lastname
          this.message.to_email = res.email
        },
        err => console.log(err)
      )
    this.loggedID = this._authService.getLoggedUser();
    if (this.loggedID !== undefined) {
      this._authService.getUserById(this.loggedID)
        .subscribe(
          res => {
            this.message.sender     = res.firstname + " " + res.lastname,
            this.message.from       = res._id,
            this.message.from_email = res.email
          },
          err => console.log(err)
        )
    }
  }

  sendMessage(){
    if (this.message.sender === undefined || this.message.sender.length == 0){
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The sender name is not filled in"
    } else if (this.message.from_email === undefined || this.message.from_email.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The email is not filled in"
    } else if (this.message.message === undefined || this.message.message.length == 0) {
      const modalRef = this.modalService.open(ModalalertComponent, { centered: true });
      modalRef.componentInstance.message = "The message is not selected in"
    } else {
        this._messageService.sendMessage(this.message)
          .subscribe(
            res => { 
              console.log(res.message),
              this.activeModal.dismiss('Cross click')
            },
            err => console.log(err)
          )
      }
  }

}
