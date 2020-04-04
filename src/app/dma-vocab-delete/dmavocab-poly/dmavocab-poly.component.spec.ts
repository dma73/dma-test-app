/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DmavocabPolyComponent } from './dmavocab-poly.component';

describe('DmavocabPolyComponent', () => {
  let component: DmavocabPolyComponent;
  let fixture: ComponentFixture<DmavocabPolyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmavocabPolyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmavocabPolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
