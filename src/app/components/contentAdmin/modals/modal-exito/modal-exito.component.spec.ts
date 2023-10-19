import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExitoComponent } from './modal-exito.component';

describe('ModalExitoComponent', () => {
  let component: ModalExitoComponent;
  let fixture: ComponentFixture<ModalExitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
