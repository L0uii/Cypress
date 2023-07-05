import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InfosUserComponent } from './infos-user.component';

describe(InfosUserComponent.name, () => {
  let component: InfosUserComponent;
  let fixture: ComponentFixture<InfosUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InfosUserComponent]
    });
    fixture = TestBed.createComponent(InfosUserComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
