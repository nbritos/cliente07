import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAdministrarComponent } from './productos-administrar.component';

describe('ProductosAdministrarComponent', () => {
  let component: ProductosAdministrarComponent;
  let fixture: ComponentFixture<ProductosAdministrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosAdministrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosAdministrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
