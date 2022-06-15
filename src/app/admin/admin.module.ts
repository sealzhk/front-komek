import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { FundraisingsComponent } from './fundraisings/fundraisings.component';
import { DonationsComponent } from './donations/donations.component';
import { CategoriesComponent } from './categories/categories.component';
import {AppModule} from "../app.module";
import { AuthGuard } from '../guards/auth.guard';
import { MypageComponent } from '../myprofile/mypage/mypage.component';
import { EditcategoryComponent } from './categories/editcategory/editcategory.component';
import { EditpageComponent } from '../myprofile/editpage/editpage.component';
import { FundraiserComponent } from '../fundraiser/fundraiser.component';


const routes: Routes = [
  {path: '', component: AdminComponent},
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fundraisings',
    component: FundraisingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'donations',
    component: DonationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: MypageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editcategory/:id',
    component: EditcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createcategory',
    component: EditcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createuser',
    component: EditpageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editfundraising/:id',
    component: FundraiserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: 
  [AdminComponent, UsersComponent, FundraisingsComponent, DonationsComponent, CategoriesComponent, EditcategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [AdminComponent, UsersComponent, FundraisingsComponent, DonationsComponent, CategoriesComponent, RouterModule]
})
export class AdminModule { }
