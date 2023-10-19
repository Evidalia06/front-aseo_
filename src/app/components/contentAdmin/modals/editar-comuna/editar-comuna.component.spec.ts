import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComunaComponent } from './editar-comuna.component';

describe('EditarComunaComponent', () => {
  let component: EditarComunaComponent;
  let fixture: ComponentFixture<EditarComunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarComunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
