import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListAddComponent } from './customer-list-add.component';

describe('CustomerListAddComponent', () => {
  let component: CustomerListAddComponent;
  let fixture: ComponentFixture<CustomerListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
