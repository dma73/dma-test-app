/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DmaMatiereListComponent } from './dma-matiere-list.component';

describe('DmaMatiereListComponent', () => {
  let component: DmaMatiereListComponent;
  let fixture: ComponentFixture<DmaMatiereListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmaMatiereListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmaMatiereListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
