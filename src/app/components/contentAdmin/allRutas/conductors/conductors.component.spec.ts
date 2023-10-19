import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorsComponent } from './conductors.component';

describe('ConductorsComponent', () => {
  let component: ConductorsComponent;
  let fixture: ComponentFixture<ConductorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConductorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
