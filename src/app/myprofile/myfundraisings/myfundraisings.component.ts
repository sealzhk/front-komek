import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {FundraisingService} from "../../service/fundraising.service";

@Component({
  selector: 'app-myfundraisings',
  templateUrl: './myfundraisings.component.html',
  styleUrls: ['./myfundraisings.component.css']
})
export class MyfundraisingsComponent implements OnInit {

  id = this._route.snapshot.params['id'];
  fundraisings:any = []

  constructor(private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._authService.getUserFundraisings(this.id)
      .subscribe(
        res => this.fundraisings = res,
        err => console.log(err)
      )
  }

  onSelectProfile() {
    this._router.navigate(['/myprofile', this.id]);
    console.log("Passed id: " + this.id);
  }
}
