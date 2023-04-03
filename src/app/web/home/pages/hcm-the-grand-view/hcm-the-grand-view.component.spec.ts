import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcmTheGrandViewComponent } from './hcm-the-grand-view.component';

describe('HcmTheGrandViewComponent', () => {
  let component: HcmTheGrandViewComponent;
  let fixture: ComponentFixture<HcmTheGrandViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcmTheGrandViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcmTheGrandViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
