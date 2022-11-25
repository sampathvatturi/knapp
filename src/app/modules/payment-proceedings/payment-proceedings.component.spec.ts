import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProceedingsComponent } from './payment-proceedings.component';

describe('PaymentProceedingsComponent', () => {
  let component: PaymentProceedingsComponent;
  let fixture: ComponentFixture<PaymentProceedingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentProceedingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentProceedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
