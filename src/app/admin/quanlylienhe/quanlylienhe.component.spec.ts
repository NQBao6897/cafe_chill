import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlylienheComponent } from './quanlylienhe.component';

describe('QuanlylienheComponent', () => {
  let component: QuanlylienheComponent;
  let fixture: ComponentFixture<QuanlylienheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlylienheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlylienheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
