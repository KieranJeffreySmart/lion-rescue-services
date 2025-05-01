import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOfferFormComponent } from './make-offer-form.component';

describe('MakeOfferFormComponent', () => {
  let component: MakeOfferFormComponent;
  let fixture: ComponentFixture<MakeOfferFormComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeOfferFormComponent]
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

  it('should have the basic form elements', () => {
    expect(compiled).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent).toContain('Make an offer');
    expect(compiled.querySelector('div#instructions')?.textContent).toContain('Enter your Sales Rep ID and read the escape service pitch before taking the Lion\'s details');

    
    expect(compiled.querySelector('button#showPitch')?.textContent).toContain('Show Pitch');

    expect(compiled.querySelector('label#salesRepIdLbl')?.textContent).toContain('Sales Rep ID');
    expect(compiled.querySelector('input#salesRepId')?.getAttribute('placeholder')).toContain('Sales Rep ID');
    expect(compiled.querySelector('input#salesRepId')?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#emailLbl')?.textContent).toContain('Email');
    expect(compiled.querySelector('input#email')?.getAttribute('placeholder')).toContain('lion@email.com');
    expect(compiled.querySelector('input#email')?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#firstNameLbl')?.textContent).toContain('First Name');
    expect(compiled.querySelector('input#firstName')?.getAttribute('placeholder')).toContain('First Name');
    expect(compiled.querySelector('input#firstName')?.getAttribute('type')).toContain('text');

    expect(compiled.querySelector('label#lastNameLbl')?.textContent).toContain('Last Name');
    expect(compiled.querySelector('input#lastName')?.getAttribute('placeholder')).toContain('Last Name');
    expect(compiled.querySelector('input#lastName')?.getAttribute('type')).toContain('text');
    
    expect(compiled.querySelector('button#submitOffer')?.textContent).toContain('Submit Offer');
  });
});
