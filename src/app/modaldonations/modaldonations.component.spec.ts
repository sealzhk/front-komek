import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldonationsComponent } from './modaldonations.component';

describe('ModaldonationsComponent', () => {
  let component: ModaldonationsComponent;
  let fixture: ComponentFixture<ModaldonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
