import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-make-offer-form',
  imports: [FormsModule, NgbPopoverModule],
  templateUrl: './make-offer-form.component.html',
  styleUrl: './make-offer-form.component.css'
})


export class MakeOfferFormComponent {
  salesRepId = "";
  email = "";
  firstName = "";
  lastName = "";
  private http = inject(HttpClient);


  submitOffer() {
    let offer = new newOfferData();
    offer.salesRepId = this.salesRepId;
    offer.email = this.email;
    offer.firstName = this.firstName;
    offer.lastName = this.lastName;

    this.http.post('offers/makeoffer', offer).subscribe((response) => {
      console.log('Offer submitted successfully', response);
    });
  }
}

class newOfferData {
  salesRepId = "";
  email = "";
  firstName = "";
  lastName = "";
}