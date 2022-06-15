import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfundraisingsComponent } from './myfundraisings.component';

describe('MyfundraisingsComponent', () => {
  let component: MyfundraisingsComponent;
  let fixture: ComponentFixture<MyfundraisingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfundraisingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfundraisingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
