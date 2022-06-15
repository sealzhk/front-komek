import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthService } from './service/auth.service';
import { FundraisingService } from './service/fundraising.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { TokenInterceptorService} from './service/token-interceptor.service';
import { FundraisingComponent } from './fundraising/fundraising.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DonateComponent } from './donate/donate.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { CategoryService } from './service/category.service';
import { DonationService } from './service/donation.service';
import { MessageService } from './service/message.service';
import { MypageComponent } from './myprofile/mypage/mypage.component';
import { EditpageComponent } from './myprofile/editpage/editpage.component';
import { MydonationsComponent } from './myprofile/mydonations/mydonations.component';
import { ChangepassComponent } from './myprofile/changepass/changepass.component';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { AdminModule } from './admin/admin.module';
import { ModaldonationsComponent } from './modaldonations/modaldonations.component';
import { ModalcontactComponent } from './modalcontact/modalcontact.component';
import { ModalalertComponent } from './modalalert/modalalert.component';
import { MyfundraisingsComponent } from './myprofile/myfundraisings/myfundraisings.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    FundraisingComponent,
    HeaderComponent,
    FooterComponent,
    DonateComponent,
    FundraiserComponent,
    MypageComponent,
    EditpageComponent,
    MydonationsComponent,
    ChangepassComponent,
    AboutComponent,
    CategoryComponent,
    ModaldonationsComponent,
    ModalcontactComponent,
    ModalalertComponent,
    MyfundraisingsComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        AdminModule,
        ReactiveFormsModule
    ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    FundraisingService,
    CategoryService,
    DonationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
