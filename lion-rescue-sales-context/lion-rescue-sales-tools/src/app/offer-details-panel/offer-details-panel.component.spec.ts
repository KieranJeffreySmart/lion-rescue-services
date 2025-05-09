import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailsPanelComponent } from './offer-details-panel.component';

describe('OfferDetailsPanelComponent', () => {
  let component: OfferDetailsPanelComponent;
  let fixture: ComponentFixture<OfferDetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferDetailsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
