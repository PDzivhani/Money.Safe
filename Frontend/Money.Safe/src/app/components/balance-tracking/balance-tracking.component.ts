import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceTrackingService } from 'src/app/services/balance-tracking.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-balance-tracking',
  templateUrl: './balance-tracking.component.html',
  styleUrls: ['./balance-tracking.component.scss']
})
export class BalanceTrackingComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  incomeForm: any;
  selectedMonth: any;
  monthSelected: boolean = false;
  incomes: any[] = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private balanceTrackingService: BalanceTrackingService
  ) { 
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required]
    });
    this.getFilteredIncomes();
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredIncomes();
  }

  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    for (const income of this.incomes) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getFilteredIncomes() {
    if (this.selectedMonth) {
      this.balanceTrackingService.getIncomesByMonth(this.selectedMonth).subscribe((data: any[]) => {
        this.incomes = data;
      });
    } else {
      this.incomes = [];
    }
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      newIncome.month = this.selectedMonth;
      this.balanceTrackingService.addIncome(newIncome).subscribe(() => {
        this.getFilteredIncomes();
        this.incomeForm.reset();
      });
    }
  }

  saveForm() {
    this.toast.showToast('Income saved!');
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000); // Wait for the toast to disappear before navigating
  }

  onBack() {
    this.router.navigate(['/home']);
  }
}
