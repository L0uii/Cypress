import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AboutComponent } from './about.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContextService } from 'services/context.service';

describe(AboutComponent.name, () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    const contextServiceStub = () => ({
      saveCurrentVersion: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ContextService,
          useFactory: contextServiceStub
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AboutComponent]
    });
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
