import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ThreatSurvivalPolicyComponent } from './threat-survival-policy.component';

describe('ThreatSurvivalPolicyComponent', () => {
  let component: ThreatSurvivalPolicyComponent;
  let fixture: ComponentFixture<ThreatSurvivalPolicyComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreatSurvivalPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatSurvivalPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should guide the mouse through surviving a threat from a lion for the first time', () => {

    // Given there is a mouse
    // And there is a lion
    // And the mouse has access to an online survival guide
    // When the mouse opens the guide
    // Then there should be an encouraging message
    expect(compiled).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent).toContain('Dont Panic!');
    expect(compiled.querySelector('h2')?.textContent).toContain('We are here to help');
    // And the mouse should be asked if it has pleaded for its life
    expect(compiled.querySelector('div#pleadForLifeInstructions')?.textContent).toContain('Step 1: Have you pleaded for your life?');

    // Given the mouse has not pleaded for it's life
    // When the mouse informs the guide that it has not pleaded for its life
    // Then a sample pleae should be displayed
    // And the mouse should be asked if the lion responds favourably

    // Given the mouse has pleaded for it's life
    // And the lion has responded favourably
    // When the mouse informs the guide of the lions attitude
    // Then the mouse should be asked if it is already a member of Aesops Lion Rescue Service

    // Given the mouse is not a member of Aesops Lion Rescue Service
    // When the mouse informs the guide of their status
    // Then the mouse should be asked to enter their personal details

    // Given the mouse has personal details
    // When the mouse submits these details 
    // Then the mouse is asked if the lion already has a deal
  
    // Given the mouse has been asked if the lion has a deal with Aesops Lion Rescue Service
    // And the lion does not have a deal with Aesops Lion Rescue Service
    // When the mouse informs the guide it does not have a deal
    // Then they are directed to a form to make a new offer

    // Given the mouse is presented with a form to make a new offer
    // And the mouse has collected the lions details
    // When the mouse submits the offer
    // Then a success message is displayed
    // And an offer ID is displayed

    // Given the lion has accepted the offer
    // And the mouse has received notification of acceptance
    // When the mouse opens the offer
    // Then an option to complete should be displayed

    // Given the mouse has opened the offer
    // And the offer is ready to complete
    // When the mouse completes the offer
    // Then the guide should congratulate the mouse
    // And display the new deal
  });
});
