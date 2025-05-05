import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MakeOfferFormComponent } from './make-offer-form/make-offer-form.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'makeoffer', component: MakeOfferFormComponent},
];
