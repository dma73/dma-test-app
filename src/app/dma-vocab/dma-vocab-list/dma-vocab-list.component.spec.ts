/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DmaVocabListComponent } from './dma-vocab-list.component';

describe('DmaVocabListComponent', () => {
  let component: DmaVocabListComponent;
  let fixture: ComponentFixture<DmaVocabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmaVocabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmaVocabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
