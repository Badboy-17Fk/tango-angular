import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormAddComponent } from './user-form-add.component';

describe('UserFormAddComponent', () => {
  let component: UserFormAddComponent;
  let fixture: ComponentFixture<UserFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
