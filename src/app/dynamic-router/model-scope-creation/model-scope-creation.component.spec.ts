import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelScopeCreationComponent } from './model-scope-creation.component';

describe('ModelScopeCreationComponent', () => {
  let component: ModelScopeCreationComponent;
  let fixture: ComponentFixture<ModelScopeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelScopeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelScopeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
