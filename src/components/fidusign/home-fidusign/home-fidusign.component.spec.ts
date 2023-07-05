import { FidusignService } from 'services/fidusign.service';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFidusignComponent } from './home-fidusign.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { fidusignServiceStub } from 'services/fidusign.service.stub';

describe('HomeFidusignComponent', () => {
  let component: HomeFidusignComponent;
  let fixture: ComponentFixture<HomeFidusignComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFidusignComponent ],
      providers: [
        {
          provide: FidusignService,
          useFactory: fidusignServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFidusignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
