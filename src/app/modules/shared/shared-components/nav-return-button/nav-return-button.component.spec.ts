import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavReturnButtonComponent } from './nav-return-button.component';

describe('NavReturnButtonComponent', () => {
  let component: NavReturnButtonComponent;
  let fixture: ComponentFixture<NavReturnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavReturnButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavReturnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
