import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewOfferFormComponent } from './new-offer-form/new-offer-form.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'newoffer', component: NewOfferFormComponent},
];
