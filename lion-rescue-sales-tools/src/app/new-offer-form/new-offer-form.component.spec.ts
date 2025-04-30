import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferFormComponent } from './new-offer-form.component';

describe('NewOfferFormComponent', () => {
  let component: NewOfferFormComponent;
  let fixture: ComponentFixture<NewOfferFormComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOfferFormComponent]
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

  it('should have the basic form elements', () => {
    expect(compiled).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent).toContain('Make an offer');
    expect(compiled.querySelector('div.instructions')?.textContent).toContain('Enter your Sales Rep ID and read the escape service pitch before taking the Lion\'s details');
  });
});
