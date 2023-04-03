import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuKhoanSuDungComponent } from './dieu-khoan-su-dung.component';

describe('DieuKhoanSuDungComponent', () => {
  let component: DieuKhoanSuDungComponent;
  let fixture: ComponentFixture<DieuKhoanSuDungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieuKhoanSuDungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieuKhoanSuDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
