import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCreateEditComponent } from './department-create-edit.component';

describe('DepartmentCreateEditComponent', () => {
  let component: DepartmentCreateEditComponent;
  let fixture: ComponentFixture<DepartmentCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
