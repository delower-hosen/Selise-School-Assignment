import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoginDefaultComponent } from './app-login-default.component';

describe('AppLoginDefaultComponent', () => {
  let component: AppLoginDefaultComponent;
  let fixture: ComponentFixture<AppLoginDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLoginDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
