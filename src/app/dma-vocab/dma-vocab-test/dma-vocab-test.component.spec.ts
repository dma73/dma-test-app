/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DmaVocabTestComponent } from './dma-vocab-test.component';

describe('DmaVocabTestComponent', () => {
  let component: DmaVocabTestComponent;
  let fixture: ComponentFixture<DmaVocabTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmaVocabTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmaVocabTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
