import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { DonateComponent } from './donate/donate.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { FundraisingComponent } from './fundraising/fundraising.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { ChangepassComponent } from './myprofile/changepass/changepass.component';
import { EditpageComponent } from './myprofile/editpage/editpage.component';
import { MydonationsComponent } from './myprofile/mydonations/mydonations.component';
import { MypageComponent } from './myprofile/mypage/mypage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {MyfundraisingsComponent} from "./myprofile/myfundraisings/myfundraisings.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'fundraising/:id',
    component: FundraisingComponent
  },
  {
    path: 'fundraiser',
    component: FundraiserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'donate/:id',
    component: DonateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myprofile/:id',
    component: MypageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editpage/:id',
    component: EditpageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'changepass/:id',
    component: ChangepassComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mydonations/:id',
    component: MydonationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myfundraisings/:id',
    component: MyfundraisingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'category/:id',
    component: CategoryComponent
  },
  {path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
