import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { TestRouteComponent } from '../test-route/test-route.component';
import { provideRouter, RouterModule } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let compiled: HTMLElement;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent, 
        RouterModule.forRoot([
          {path: 'newoffer', component: TestRouteComponent},
          {path: 'acceptoffer', component: TestRouteComponent},
          {path: 'completeoffer', component: TestRouteComponent},
          {path: 'acceptdeal', component: TestRouteComponent}
        ])],
      providers: [
        provideLocationMocks()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    location = TestBed.inject(Location);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title`, () => {
    expect(component.title).toEqual('Lion Rescue');
  });

  it('should render title', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to, Lion Rescue');
  });

  it('should render a strap line', () => {
    expect(compiled.querySelector('p')?.textContent).toContain('Ready to start saving Lions?');
  });
  
  it('should render command buttons', () => {
    const pillgroup = compiled.querySelector('div.pill-group')
    expect(pillgroup?.childElementCount).toEqual(4);

    expect(pillgroup?.children[0].textContent).toContain('New Offer');
    expect(pillgroup?.children[1].textContent).toContain('Accept Offer');
    expect(pillgroup?.children[2].textContent).toContain('Complete Offer');
    expect(pillgroup?.children[3].textContent).toContain('Accept Deal');
  });

  it('new offer button should redirect', async() => {
    const pillgroup = compiled.querySelector('div.pill-group')
    expect(pillgroup?.childElementCount).toEqual(4);
    pillgroup?.getElementsByTagName('a')[0].click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/newoffer");
    });
  });
  
  it('accept offer button should redirect', async() => {
    const pillgroup = compiled.querySelector('div.pill-group')
    expect(pillgroup?.childElementCount).toEqual(4);
    pillgroup?.getElementsByTagName('a')[1].click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/acceptoffer");
    });
  });
  
  it('complete offer button should redirect', async() => {
    const pillgroup = compiled.querySelector('div.pill-group')
    expect(pillgroup?.childElementCount).toEqual(4);
    pillgroup?.getElementsByTagName('a')[2].click();
    const location = TestBed.inject(Location);
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/completeoffer");
    });
  });
  
  it('accept deal button should redirect', async() => {
    const pillgroup = compiled.querySelector('div.pill-group')
    expect(pillgroup?.childElementCount).toEqual(4);
    pillgroup?.getElementsByTagName('a')[3].click();
    const location = TestBed.inject(Location);
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/acceptdeal");
    });
  });
});
