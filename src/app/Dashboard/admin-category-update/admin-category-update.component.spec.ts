import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryUpdateComponent } from './admin-category-update.component';

describe('AdminCategoryUpdateComponent', () => {
  let component: AdminCategoryUpdateComponent;
  let fixture: ComponentFixture<AdminCategoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
