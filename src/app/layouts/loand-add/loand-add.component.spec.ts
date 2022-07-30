import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoandAddComponent } from './loand-add.component';

describe('LoandAddComponent', () => {
  let component: LoandAddComponent;
  let fixture: ComponentFixture<LoandAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoandAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoandAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
