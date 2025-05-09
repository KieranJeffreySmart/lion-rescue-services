import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { NewOffer } from './new-offer';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, of } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-offer-form',
  imports: [FormsModule],
  templateUrl: './new-offer-form.component.html',
  styleUrl: './new-offer-form.component.css'
})
export class NewOfferFormComponent {  

   @ViewChild('errorModal') errorModal: any;
   @ViewChild('offerDetailsModal') offerDetailsModal: any;

  private http = inject(HttpClient);
	private modalService = inject(NgbModal);
  private router = inject(Router);

  model = new NewOffer('', '', '', '');
  submitted = false;
  errorMessage = "";
  offerDetails = "";
  errorModalRef: NgbModalRef | undefined;
  offerDetailsModalRef: NgbModalRef | undefined;

  cancelSubmit() {
    this.submitted = false;
    this.model = new NewOffer('', '', '', '');
    this.modalService.dismissAll();
    this.errorMessage = "";
    this.offerDetails = "";
    this.router.navigate(['/']);
  }
  
  submitOffer(form: any) {
    if (!form.invalid) {
        this.http.post('offers/makeoffer', this.model, {responseType: 'text', observe: 'response'})
        .pipe(
          tap(data=>console.log(data)),
          map(data=> data),
          catchError(err => of(err))
        )
        .subscribe((response) => {
          console.log('Response:', response);
          if (response.status === 200) {
            this.submitted = true;

            this.offerDetails = response.body ?? "No offer details returned";
            console.log('Offer submitted successfully', this.offerDetails);
            this.offerDetailsModalRef = this.modalService.open(this.offerDetailsModal, { fullscreen: true });
          
            //this.model = new NewOffer('', '', '', '');
            //form.setPristine();
          }
          else {
            this.errorMessage = response.message ?? "Error submitting offer. Status code: " + response.status;

		        this.errorModalRef = this.modalService.open(this.errorModal, { fullscreen: true });
            console.log(this.errorMessage, this.errorModal);
          }
      });     
    }
  }

}
