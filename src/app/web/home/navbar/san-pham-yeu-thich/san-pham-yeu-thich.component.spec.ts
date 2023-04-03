import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamYeuThichComponent } from './san-pham-yeu-thich.component';

describe('SanPhamYeuThichComponent', () => {
  let component: SanPhamYeuThichComponent;
  let fixture: ComponentFixture<SanPhamYeuThichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanPhamYeuThichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanPhamYeuThichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
