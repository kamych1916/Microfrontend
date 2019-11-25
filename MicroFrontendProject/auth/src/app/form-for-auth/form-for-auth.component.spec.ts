import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForAuthComponent } from './form-for-auth.component';

describe('FormForAuthComponent', () => {
  let component: FormForAuthComponent;
  let fixture: ComponentFixture<FormForAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormForAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormForAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
