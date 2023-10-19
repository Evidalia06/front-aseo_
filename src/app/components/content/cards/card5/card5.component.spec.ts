import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card5Component } from './card5.component';

describe('Card5Component', () => {
  let component: Card5Component;
  let fixture: ComponentFixture<Card5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
