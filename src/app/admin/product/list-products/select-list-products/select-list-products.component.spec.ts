import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListProductsComponent } from './select-list-products.component';

describe('SelectListProductsComponent', () => {
  let component: SelectListProductsComponent;
  let fixture: ComponentFixture<SelectListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectListProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
