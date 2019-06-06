import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspelhoPage } from './espelho.page';

describe('EspelhoPage', () => {
  let component: EspelhoPage;
  let fixture: ComponentFixture<EspelhoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspelhoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspelhoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
