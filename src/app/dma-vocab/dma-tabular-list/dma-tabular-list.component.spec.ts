/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DmaTabularListComponent } from './dma-tabular-list.component';

describe('DmaVocabListComponent', () => {
  let component: DmaTabularListComponent;
  let fixture: ComponentFixture<DmaTabularListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmaTabularListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmaTabularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
