import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaTinTucComponent } from './sua-tin-tuc.component';

describe('SuaTinTucComponent', () => {
  let component: SuaTinTucComponent;
  let fixture: ComponentFixture<SuaTinTucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuaTinTucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuaTinTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
