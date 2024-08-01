import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTrackingComponent } from './balance-tracking.component';

describe('BalanceTrackingComponent', () => {
  let component: BalanceTrackingComponent;
  let fixture: ComponentFixture<BalanceTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceTrackingComponent]
    });
    fixture = TestBed.createComponent(BalanceTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
