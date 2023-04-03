import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuangLyTinTucComponent } from './quang-ly-tin-tuc.component';

describe('QuangLyTinTucComponent', () => {
  let component: QuangLyTinTucComponent;
  let fixture: ComponentFixture<QuangLyTinTucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuangLyTinTucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuangLyTinTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
