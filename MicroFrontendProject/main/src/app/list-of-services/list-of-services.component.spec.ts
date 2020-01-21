import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfServicesComponent } from './list-of-services.component';

describe('ListOfServicesComponent', () => {
  let component: ListOfServicesComponent;
  let fixture: ComponentFixture<ListOfServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
