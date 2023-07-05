import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  template: `
    <div>Without Directive</div>
    <div appDragAndDrop>Default</div>
  `
})
class TestComponent {}

describe(DragAndDropDirective.name, () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragAndDropDirective, TestComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(DragAndDropDirective)
    );
    bareElement = fixture.debugElement.query(By.css(':not([appDragAndDrop])'));
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
