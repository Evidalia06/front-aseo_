import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarriohorarioComponent } from './barriohorario.component';

describe('BarriohorarioComponent', () => {
  let component: BarriohorarioComponent;
  let fixture: ComponentFixture<BarriohorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarriohorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarriohorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
