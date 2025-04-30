import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TestRouteComponent } from './test-route/test-route.component';
import { provideLocationMocks } from '@angular/common/testing';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([{path: '', component: TestRouteComponent}])],
      providers: [
        provideLocationMocks()
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    location = TestBed.inject(Location);
  });

  it('should create the app', () => {
    expect(fixture).toBeTruthy();
  });

  
  it('should render home button', async() => {
    const pills = compiled.querySelector('a.pill')
    expect(pills?.childElementCount).toEqual(1);
    compiled.getElementsByTagName('a')[0].click();
    const location = TestBed.inject(Location);
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/");
    });
  });
});
