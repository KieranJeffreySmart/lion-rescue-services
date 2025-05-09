import { Component, inject } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NewOfferFormComponent } from "./new-offer-form/new-offer-form.component";

@Component({
  selector: 'app-make-offer-form',
  imports: [FormsModule, NgbPopoverModule, NewOfferFormComponent],
  templateUrl: './make-offer-form.component.html',
  styleUrl: './make-offer-form.component.css'
})


export class MakeOfferFormComponent {


}