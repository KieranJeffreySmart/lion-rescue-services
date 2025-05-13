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
    
    let newOfferForm = compiled.querySelector('form#makeOfferForm') as HTMLElement;
    expect(newOfferForm).toBeTruthy();
  }));
});
