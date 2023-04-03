import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhSachBaoMatThongTinComponent } from './chinh-sach-bao-mat-thong-tin.component';

describe('ChinhSachBaoMatThongTinComponent', () => {
  let component: ChinhSachBaoMatThongTinComponent;
  let fixture: ComponentFixture<ChinhSachBaoMatThongTinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChinhSachBaoMatThongTinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChinhSachBaoMatThongTinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
