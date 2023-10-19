import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConsejoComponent } from './editar-consejo.component';

describe('EditarConsejoComponent', () => {
  let component: EditarConsejoComponent;
  let fixture: ComponentFixture<EditarConsejoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarConsejoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarConsejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
