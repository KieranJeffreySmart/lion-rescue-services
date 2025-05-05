import { ComponentFixture, fakeAsync, TestBed, tick  } from '@angular/core/testing';
import { MakeOfferFormComponent } from './make-offer-form.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('MakeOfferFormComponent', () => {
  let component: MakeOfferFormComponent;
  let fixture: ComponentFixture<MakeOfferFormComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeOfferFormComponent],
      providers : [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the basic form elements', <any>fakeAsync(() => {
    expect(compiled).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent).toContain('Make an offer');
    expect(compiled.querySelector('div#instructions')?.textContent).toContain('Don\'t forget to read the escape service pitch before taking the Lion\'s details');

    let showPitchButton = compiled.querySelector('button#showPitch') as HTMLButtonElement;
    expect(showPitchButton?.textContent).toContain('Show Pitch');
    expect(showPitchButton).toBeTruthy();

    let windowEl = compiled.querySelector('ngb-popover-window');
    expect(windowEl).toBeNull();

    showPitchButton?.dispatchEvent(new Event('click'));
    tick();    
    windowEl = compiled.querySelector('ngb-popover-window');
    expect(windowEl).toBeTruthy();
    expect(compiled.querySelector('.popover-body')).toBeTruthy();
    expect(compiled.querySelector('.popover-body')?.textContent).toContain('Spare Me! Please let me go and some day I will surely repay you as my great Aunt Mabel saved the Lion king Bob from the clutches of an evil hunters trap. I too shall be your protector when you are in time of need'); 
    
    showPitchButton = compiled.querySelector('button#showPitch') as HTMLButtonElement;
    showPitchButton?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
    windowEl = compiled.querySelector('ngb-popover-window');
    //TODO: Get this working -- expect(windowEl).toBeNull();

    expect(compiled.querySelector('label#salesRepIdLbl')?.textContent).toContain('Sales Rep ID');
    let salesRedIdInput = compiled.querySelector('input#salesRepId') as HTMLInputElement 
    expect(salesRedIdInput?.getAttribute('placeholder')).toContain('Sales Rep ID');
    expect(salesRedIdInput?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#emailLbl')?.textContent).toContain('Email');
    let emailInput = compiled.querySelector('input#email') as HTMLInputElement 
    expect(emailInput?.getAttribute('placeholder')).toContain('lion@email.com');
    expect(emailInput?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#firstNameLbl')?.textContent).toContain('First Name');
    let firstNameInput = compiled.querySelector('input#firstName') as HTMLInputElement 
    expect(firstNameInput?.getAttribute('placeholder')).toContain('First Name');
    expect(firstNameInput?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#lastNameLbl')?.textContent).toContain('Last Name');
    let lastNameInput = compiled.querySelector('input#lastName') as HTMLInputElement 
    expect(lastNameInput?.getAttribute('placeholder')).toContain('Last Name');
    expect(lastNameInput?.getAttribute('type')).toContain('text');
    
    const httpTesting = TestBed.inject(HttpTestingController);
    let submitButton = compiled.querySelector('button#submitOffer') as HTMLButtonElement;
    expect(submitButton?.textContent).toContain('Submit Offer');
    expect(submitButton).toBeTruthy();


    salesRedIdInput.value = "Mabel";
    salesRedIdInput.dispatchEvent(new Event('input'));
    emailInput.value = "bobdeleon@lionking.com";
    emailInput.dispatchEvent(new Event('input'));
    firstNameInput.value = "Bob";
    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.value = "DeLeon";
    lastNameInput.dispatchEvent(new Event('input'));

    submitButton?.click();
    tick();

    const req = httpTesting.expectOne('/offer/makeoffer', 'Request to load the configuration');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeTruthy();
    expect(req.request.body.salesRepId).toEqual("Mabel");
    expect(req.request.body.email).toEqual("bobdeleon@lionking.com");
    expect(req.request.body.firstName).toEqual("Bob");
    expect(req.request.body.lastName).toEqual("DeLeon");
  }));
});
