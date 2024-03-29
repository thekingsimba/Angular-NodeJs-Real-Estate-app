import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { AuthenticationService } from '../../../auth/auth-services/authentication.service';
import { AuthState, AuthStateModel } from '../../../auth/store/auth.state';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy, OnInit {

  @Select(AuthState) authState$: Observable<AuthStateModel>;

  isLoggedIn = false;

  authActive = false;

  mobileMenuActive = false;

  componentIsActive = true;

  componentToDisplay: 'SignIn' | 'SignUp' | 'Menu';

  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.authState$.pipe(takeWhile(() => this.componentIsActive))
    .subscribe((state) => {
      this.isLoggedIn = state.isLoggedIn;
    });
  }


  openSignIn(): void {
    this.authActive = true;
    this.mobileMenuActive = false;
    this.componentToDisplay = 'SignIn';
  }

  openSignup(): void  {
    this.authActive = true;
    this.componentToDisplay = 'SignUp';
  }

  openMenu(): void  {
    this.mobileMenuActive = true;
    this.componentToDisplay = 'Menu';
  }

  signOut(): void {
    this.authActive = false;
    this.mobileMenuActive = false;
    this.authenticationService.logout();
  }

  ngOnDestroy(): void {
    this.authActive = false;
    this.componentIsActive = false;
  }

}
