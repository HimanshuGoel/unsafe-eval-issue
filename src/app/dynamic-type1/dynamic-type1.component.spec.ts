import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicType1Component } from './dynamic-type1.component';

describe('DynamicType1Component', () => {
  let component: DynamicType1Component;
  let fixture: ComponentFixture<DynamicType1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicType1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
