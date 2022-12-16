import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTenderComponent } from './assign-tender.component';

describe('AssignTenderComponent', () => {
  let component: AssignTenderComponent;
  let fixture: ComponentFixture<AssignTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
