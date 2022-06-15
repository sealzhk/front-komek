import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FundraisingService } from 'src/app/service/fundraising.service';

@Component({
  selector: 'app-mydonations',
  templateUrl: './mydonations.component.html',
  styleUrls: ['./mydonations.component.css']
})

export class MydonationsComponent implements OnInit {
  id = this._route.snapshot.params['id'];
  userData: any = [];
  donations: any = [];
  fundraisings: any = [];
  needItems: any = [];
  donation: string;
  fundraising: string;
  private needObject: { fundName: string; donationSum: number };

  constructor(private _authService: AuthService,
              private _fundraisingService: FundraisingService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._authService.getUserDonations(this.id)
      .subscribe(
        res => {
          this.donations = res;
          for(let i = 0; i < res.length; i++){
            this._fundraisingService.getFundraisingById(res[i].fundraisingid)
              .subscribe(
                fund => {
                  this.fundraisings[i] = fund;
                  this.needItems[i] = {fundName: this.fundraisings[i].title,
                                       donationSum: this.donations[i].donation};
                }
              );
          }
        },
            err => console.log(err)
      );

  }

  onSelectProfile() {
    this._router.navigate(['/myprofile', this.id]);
    console.log("Passed id: " + this.id);
  }

}
