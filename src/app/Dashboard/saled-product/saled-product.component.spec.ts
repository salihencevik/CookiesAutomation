import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaledProductComponent } from './saled-product.component';

describe('SaledProductComponent', () => {
  let component: SaledProductComponent;
  let fixture: ComponentFixture<SaledProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaledProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaledProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
