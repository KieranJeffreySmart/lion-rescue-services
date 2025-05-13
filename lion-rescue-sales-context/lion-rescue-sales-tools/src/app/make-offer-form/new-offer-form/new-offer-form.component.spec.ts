import { ComponentFixture, fakeAsync, TestBed, tick  } from '@angular/core/testing';

import { NewOfferFormComponent } from './new-offer-form.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('NewOfferFormComponent', () => {
  let component: NewOfferFormComponent;
  let fixture: ComponentFixture<NewOfferFormComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOfferFormComponent],
      providers : [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should have the basic form elements', <any>fakeAsync(() => {

    expect(compiled.querySelector('label#mouseIdLbl')?.textContent).toContain('Sales Rep ID');
    let mouseIdInput = compiled.querySelector('input#mouseIdInpt') as HTMLInputElement 
    expect(mouseIdInput?.getAttribute('placeholder')).toContain('Sales Rep ID');
    expect(mouseIdInput?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#emailLbl')?.textContent).toContain('Email');
    let emailInput = compiled.querySelector('input#emailInpt') as HTMLInputElement 
    expect(emailInput?.getAttribute('placeholder')).toContain('lion@email.com');
    expect(emailInput?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#firstNameLbl')?.textContent).toContain('First Name');
    let firstNameInput = compiled.querySelector('input#firstNameInpt') as HTMLInputElement 
    expect(firstNameInput?.getAttribute('placeholder')).toContain('First Name');
    expect(firstNameInput?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#lastNameLbl')?.textContent).toContain('Last Name');
    let lastNameInput = compiled.querySelector('input#lastNameInpt') as HTMLInputElement 
    expect(lastNameInput?.getAttribute('placeholder')).toContain('Last Name');
    expect(lastNameInput?.getAttribute('type')).toContain('text');
    
    const httpTesting = TestBed.inject(HttpTestingController);
    let submitButton = compiled.querySelector('button#submitOffer') as HTMLButtonElement;
    expect(submitButton?.textContent).toContain('Submit Offer');
    expect(submitButton).toBeTruthy();


    mouseIdInput.value = "Mabel";
    mouseIdInput.dispatchEvent(new Event('input'));
    emailInput.value = "bobdeleon@lionking.com";
    emailInput.dispatchEvent(new Event('input'));
    firstNameInput.value = "Bob";
    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.value = "DeLeon";
    lastNameInput.dispatchEvent(new Event('input'));

    submitButton?.click();
    tick();
    fixture.detectChanges();

    const req = httpTesting.expectOne('offers/makeoffer', 'Request to make an offer');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeTruthy();
    expect(req.request.body.mouseId).toEqual("Mabel");
    expect(req.request.body.email).toEqual("bobdeleon@lionking.com");
    expect(req.request.body.firstName).toEqual("Bob");
    expect(req.request.body.lastName).toEqual("DeLeon");
  }));
  
  it('should validate all required fields are populated', <any>fakeAsync(() => {
    let mouseIdInput = compiled.querySelector('input#mouseIdInpt') as HTMLInputElement 
    let emailInput = compiled.querySelector('input#emailInpt') as HTMLInputElement 
    let firstNameInput = compiled.querySelector('input#firstNameInpt') as HTMLInputElement 
    let lastNameInput = compiled.querySelector('input#lastNameInpt') as HTMLInputElement 
    
    const httpTesting = TestBed.inject(HttpTestingController);
    let submitButton = compiled.querySelector('button#submitOffer') as HTMLButtonElement;
    expect(submitButton?.textContent).toContain('Submit Offer');
    expect(submitButton).toBeTruthy();

    
    let mouseIdAlerts = compiled.querySelector('div#mouseIdAlerts') as HTMLInputElement 
    expect(mouseIdAlerts).toBeFalsy();
    let emailAlerts = compiled.querySelector('div#emailAlerts') as HTMLInputElement 
    expect(emailAlerts).toBeFalsy();
    let firstNameAlerts = compiled.querySelector('div#firstNameAlerts') as HTMLInputElement 
    expect(firstNameAlerts).toBeFalsy();
    let lastNameAlerts = compiled.querySelector('div#lastNameAlerts') as HTMLInputElement 
    expect(lastNameAlerts).toBeFalsy();

    mouseIdInput.value = "";
    mouseIdInput.dispatchEvent(new Event('input'));
    mouseIdInput.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    mouseIdAlerts = compiled.querySelector('div#mouseIdAlerts') as HTMLInputElement 
    expect(mouseIdAlerts).toBeTruthy();
    expect(mouseIdAlerts.children.length).toEqual(1);
    expect(mouseIdAlerts.children[0].textContent).toContain("Sales Rep ID is required");

    emailInput.value = "";
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    emailAlerts = compiled.querySelector('div#emailAlerts') as HTMLInputElement 
    expect(emailAlerts).toBeTruthy();
    expect(emailAlerts.children.length).toEqual(1);
    expect(emailAlerts.children[0].textContent).toContain("Email is required");

    firstNameInput.value = "";
    firstNameInput.dispatchEvent(new Event('input'));
    firstNameInput.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    firstNameAlerts = compiled.querySelector('div#firstNameAlerts') as HTMLInputElement 
    expect(firstNameAlerts).toBeTruthy();
    expect(firstNameAlerts.children.length).toEqual(1);
    expect(firstNameAlerts.children[0].textContent).toContain("First Name is required");

    lastNameInput.value = "";
    lastNameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    lastNameAlerts = compiled.querySelector('div#lastNameAlerts') as HTMLInputElement 
    expect(lastNameAlerts).toBeTruthy();
    expect(lastNameAlerts.children.length).toEqual(1);
    expect(lastNameAlerts.children[0].textContent).toContain("Last Name is required");

    submitButton?.click();
    tick();

    fixture.detectChanges();
    httpTesting.expectNone('offers/makeoffer', 'Request to make an offer');
  }));
});
