import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageComponent} from './message.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [MessageComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {
          updatedMessage: 'a',
          replacedCharacters: []
        }},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
