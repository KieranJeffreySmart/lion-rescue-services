import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindOfferSearchBarComponent } from './find-offer-search-bar.component';

describe('FindOfferSearchBarComponent', () => {
  let component: FindOfferSearchBarComponent;
  let fixture: ComponentFixture<FindOfferSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindOfferSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindOfferSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
