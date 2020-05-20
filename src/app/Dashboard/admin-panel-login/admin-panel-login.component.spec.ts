import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelLoginComponent } from './admin-panel-login.component';

describe('AdminPanelLoginComponent', () => {
  let component: AdminPanelLoginComponent;
  let fixture: ComponentFixture<AdminPanelLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
