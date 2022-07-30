import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLoansComponent } from './one-loans.component';

describe('OneLoansComponent', () => {
  let component: OneLoansComponent;
  let fixture: ComponentFixture<OneLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
