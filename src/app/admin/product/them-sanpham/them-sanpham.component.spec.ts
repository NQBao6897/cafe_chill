import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSanphamComponent } from './them-sanpham.component';

describe('ThemSanphamComponent', () => {
  let component: ThemSanphamComponent;
  let fixture: ComponentFixture<ThemSanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemSanphamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
