import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaSanphamComponent } from './sua-sanpham.component';

describe('SuaSanphamComponent', () => {
  let component: SuaSanphamComponent;
  let fixture: ComponentFixture<SuaSanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuaSanphamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuaSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
