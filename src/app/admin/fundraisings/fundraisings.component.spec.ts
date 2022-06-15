import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraisingsComponent } from './fundraisings.component';

describe('FundraisingsComponent', () => {
  let component: FundraisingsComponent;
  let fixture: ComponentFixture<FundraisingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraisingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundraisingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
