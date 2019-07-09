import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookToStoreComponent } from './add-book-to-store.component';

describe('AddBookToStoreComponent', () => {
  let component: AddBookToStoreComponent;
  let fixture: ComponentFixture<AddBookToStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookToStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookToStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
