import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraBusquedaAnyadirComponent } from './barra-busqueda-anyadir.component';

describe('BarraBusquedaAnyadirComponent', () => {
  let component: BarraBusquedaAnyadirComponent;
  let fixture: ComponentFixture<BarraBusquedaAnyadirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraBusquedaAnyadirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraBusquedaAnyadirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
