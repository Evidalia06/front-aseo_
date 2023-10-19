import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBarrioComponent } from './editar-barrio.component';

describe('EditarBarrioComponent', () => {
  let component: EditarBarrioComponent;
  let fixture: ComponentFixture<EditarBarrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarBarrioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarBarrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
