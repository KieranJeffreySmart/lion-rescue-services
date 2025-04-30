import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOfferFormComponent } from './complete-offer-form.component';

describe('CompleteOfferFormComponent', () => {
  let component: CompleteOfferFormComponent;
  let fixture: ComponentFixture<CompleteOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteOfferFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
