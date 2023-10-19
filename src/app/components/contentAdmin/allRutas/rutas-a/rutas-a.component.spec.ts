import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasAComponent } from './rutas-a.component';

describe('RutasAComponent', () => {
  let component: RutasAComponent;
  let fixture: ComponentFixture<RutasAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutasAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
