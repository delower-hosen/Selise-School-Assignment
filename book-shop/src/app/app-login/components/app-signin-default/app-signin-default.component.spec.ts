import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSigninDefaultComponent } from './app-signin-default.component';

describe('AppSigninDefaultComponent', () => {
  let component: AppSigninDefaultComponent;
  let fixture: ComponentFixture<AppSigninDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSigninDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSigninDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
