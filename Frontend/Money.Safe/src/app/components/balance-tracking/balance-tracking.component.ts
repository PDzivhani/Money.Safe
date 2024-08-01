import { Component, OnInit } from '@angular/core';
import { BalanceTrackingService } from 'src/app/services/balance-tracking.service';


@Component({
  selector: 'app-balance-tracking',
  templateUrl: './balance-tracking.component.html',
  styleUrls: ['./balance-tracking.component.scss']
})
export class BalanceTrackingComponent implements OnInit{
  balance: number = 0;
  transactions: any[] = [];
  newTransaction: { description: string; amount: number } = { description: '', amount: 0 };

  constructor(private balanceTrackingService: BalanceTrackingService) {}

  ngOnInit(): void {
    this.loadBalance();
    this.loadTransactions();
  }

  loadBalance(): void {
    this.balanceTrackingService.getBalance().subscribe(balance => {
      this.balance = balance;
    });
  }

  loadTransactions(): void {
    this.balanceTrackingService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  addTransaction(): void {
    this.balanceTrackingService.addTransaction(this.newTransaction).subscribe(() => {
      this.loadBalance();
      this.loadTransactions();
      this.newTransaction = { description: '', amount: 0 };
    });
  }
}
