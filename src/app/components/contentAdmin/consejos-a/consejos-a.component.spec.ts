import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosAComponent } from './consejos-a.component';

describe('ConsejosAComponent', () => {
  let component: ConsejosAComponent;
  let fixture: ComponentFixture<ConsejosAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsejosAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejosAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
