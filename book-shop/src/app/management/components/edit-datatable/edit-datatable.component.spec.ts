import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDatatableComponent } from './edit-datatable.component';

describe('EditDatatableComponent', () => {
  let component: EditDatatableComponent;
  let fixture: ComponentFixture<EditDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
