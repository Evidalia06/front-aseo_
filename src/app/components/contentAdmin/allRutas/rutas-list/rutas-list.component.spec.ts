import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasListComponent } from './rutas-list.component';

describe('RutasListComponent', () => {
  let component: RutasListComponent;
  let fixture: ComponentFixture<RutasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
