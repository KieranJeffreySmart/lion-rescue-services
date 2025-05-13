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
  
  it('should guide me through surviving the threat from a lion for the first time', () => {

    // Given there is a mouse
    // And the mouse is not a member of Aesops Lion Rescue Service

    // And there is a lion
    // And the lion does not have a deal with Aesops Lion Rescue Service

    // and the mouse has access to an online survival guide
    expect(compiled).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent).toContain('Dont Panic!');
    expect(compiled.querySelector('h2')?.textContent).toContain('We are here to help');

    // and the mouse has not pleaded for it's life
    expect(compiled.querySelector('div#pleadForLifeInstructions')?.textContent).toContain('Step 1: Have you pleaded for your life?');

    // when the mouse informs the guide
    // then a sample pleae should be displayed

    // Given the mouse has pleaded for it's life
    // And the lion has responded favourably

    // When the mouse has informed the guide of the lions attitude

    // Then the mouse should be asked if it is already a member of Aesops Lion Rescue Service

    // Given the mouse is not a member of the Aesops Lion Rescue Service
    // When the mouse has informed the guide of their status
    // Then the mouse should be asked to enter their personal details

    // Given the mouse has personal details
    // When the mouse submits these details 
    // Then the mouse is asked if the lion already has a deal
  
    // Given the mouse has been asked to confirm if the lion has a deal
    // they are directed to a form to make a new offer

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
