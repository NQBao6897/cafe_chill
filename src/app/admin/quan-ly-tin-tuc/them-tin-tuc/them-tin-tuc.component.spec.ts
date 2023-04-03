import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemTinTucComponent } from './them-tin-tuc.component';

describe('ThemTinTucComponent', () => {
  let component: ThemTinTucComponent;
  let fixture: ComponentFixture<ThemTinTucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemTinTucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemTinTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
