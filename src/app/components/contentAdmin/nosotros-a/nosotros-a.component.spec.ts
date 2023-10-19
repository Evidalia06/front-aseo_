import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosAComponent } from './nosotros-a.component';

describe('NosotrosAComponent', () => {
  let component: NosotrosAComponent;
  let fixture: ComponentFixture<NosotrosAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosotrosAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosotrosAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
