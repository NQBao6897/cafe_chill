import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsChiTietComponent } from './news-chi-tiet.component';

describe('NewsChiTietComponent', () => {
  let component: NewsChiTietComponent;
  let fixture: ComponentFixture<NewsChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
