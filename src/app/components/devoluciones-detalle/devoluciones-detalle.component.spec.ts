import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionesDetalleComponent } from './devoluciones-detalle.component';

describe('DevolucionesDetalleComponent', () => {
  let component: DevolucionesDetalleComponent;
  let fixture: ComponentFixture<DevolucionesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionesDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
