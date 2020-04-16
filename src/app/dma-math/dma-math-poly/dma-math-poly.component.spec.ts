/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DmaMathPolyComponent } from './dma-math-poly.component';

describe('DmavocabPolyComponent', () => {
  let component: DmaMathPolyComponent;
  let fixture: ComponentFixture<DmaMathPolyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmaMathPolyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmaMathPolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
