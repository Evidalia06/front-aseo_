import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayaoutAdminComponent } from './layaout-admin.component';

describe('LayaoutAdminComponent', () => {
  let component: LayaoutAdminComponent;
  let fixture: ComponentFixture<LayaoutAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayaoutAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayaoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
