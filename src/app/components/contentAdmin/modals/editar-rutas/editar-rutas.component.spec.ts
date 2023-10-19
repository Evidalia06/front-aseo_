import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRutasComponent } from './editar-rutas.component';

describe('EditarRutasComponent', () => {
  let component: EditarRutasComponent;
  let fixture: ComponentFixture<EditarRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
