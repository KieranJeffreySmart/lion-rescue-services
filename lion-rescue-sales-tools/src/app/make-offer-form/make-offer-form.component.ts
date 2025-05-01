import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-make-offer-form',
  imports: [FormsModule],
  templateUrl: './make-offer-form.component.html',
  styleUrl: './make-offer-form.component.css'
})
export class MakeOfferFormComponent {
  salesRepId = "";
  email = "";
  firstName = "";
  lastName = "";

}
