import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobFileViewComponent } from './blob-file-view.component';

describe('BlobFileViewComponent', () => {
  let component: BlobFileViewComponent;
  let fixture: ComponentFixture<BlobFileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlobFileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlobFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
