import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVideosComponent } from './editar-videos.component';

describe('EditarVideosComponent', () => {
  let component: EditarVideosComponent;
  let fixture: ComponentFixture<EditarVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
