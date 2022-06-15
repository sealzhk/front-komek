import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalalertComponent } from './modalalert.component';

describe('ModalalertComponent', () => {
  let component: ModalalertComponent;
  let fixture: ComponentFixture<ModalalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
