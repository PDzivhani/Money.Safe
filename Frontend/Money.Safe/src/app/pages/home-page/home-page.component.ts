import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  username: string | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.username = user.username; // Adjust based on actual user object
    });
  }

  //Income
  lastMonthsIncome = ['January: R1000', 'February: R1500', 'March: R1200'];
  currentMonthIncome = 'R2000';

  //Expense
  lastMonthsExpense = ['January: R800', 'February: R1000', 'March: R1200'];
  currentMonthExpense = 'R1500';
 
  //Todo Trans
  todoTransactions = [
    { description: 'Pay electricity bill' },
    { description: 'Submit monthly report' },
    { description: 'Buy groceries' },
    { description: 'Call insurance company' }
  ];

  //Total
  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1500;
  

  onIncome() {
    this.router.navigate(['/balance']);
  }
  onExpense() {
    this.router.navigate(['/expense']);
  }
  onTodo() {
    this.router.navigate(['/todo']);
  }
  
  //Calculate Total
  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
