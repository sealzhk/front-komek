import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcontactComponent } from './modalcontact.component';

describe('ModalcontactComponent', () => {
  let component: ModalcontactComponent;
  let fixture: ComponentFixture<ModalcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
