/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OneDayComponent } from './one-day.component';

describe('OneDayComponent', () => {
  let component: OneDayComponent;
  let fixture: ComponentFixture<OneDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
