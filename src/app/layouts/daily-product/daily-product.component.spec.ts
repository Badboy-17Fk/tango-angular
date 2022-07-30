import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyProductComponent } from './daily-product.component';

describe('DailyProductComponent', () => {
  let component: DailyProductComponent;
  let fixture: ComponentFixture<DailyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
