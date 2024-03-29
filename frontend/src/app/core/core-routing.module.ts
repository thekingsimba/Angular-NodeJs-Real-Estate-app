import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddNewOfferComponent } from './add-new-offer/add-new-offer.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserOnboardingComponent } from './user-onboarding/user-onboarding.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    children: [
      {
        path: 'onboarding',
        component: UserOnboardingComponent
      },
      {
        path: 'user-posts',
        component: UserPostsComponent
      },
      {
        path: 'add-new-posts',
        component: AddNewOfferComponent
      },
      {
        path: 'update-posts/:houseId',
        component: AddNewOfferComponent
      },
      {
        path: '',
        redirectTo: 'onboarding',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
