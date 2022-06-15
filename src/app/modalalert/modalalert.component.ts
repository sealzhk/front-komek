import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalalert',
  templateUrl: './modalalert.component.html',
  styleUrls: ['./modalalert.component.css']
})
export class ModalalertComponent implements OnInit {

  @Input() message;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
