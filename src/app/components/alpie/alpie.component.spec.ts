import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlpieComponent } from './alpie.component';

describe('AlpieComponent', () => {
  let component: AlpieComponent;
  let fixture: ComponentFixture<AlpieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlpieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlpieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
