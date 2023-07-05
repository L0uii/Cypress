import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PreviewService } from './../../../services/preview.service';
import { MaterialModule } from './../../../app/modules/material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailButtonComponent } from './send-mail-button.component';
import { Router } from '@angular/router';

describe(SendMailButtonComponent.name, () => {
  let component: SendMailButtonComponent;
  let fixture: ComponentFixture<SendMailButtonComponent>;

  const previewServiceStub = () => {};
  const routerStub = () => ({ navigate: array => ({}) });
  const translateServiceStub = () => ({ currentLang: 'fr' });

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ SendMailButtonComponent ],
      providers: [
        { provide: PreviewService, useFactory: previewServiceStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
