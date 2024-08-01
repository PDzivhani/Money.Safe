import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceTrackingComponent } from './components/balance-tracking/balance-tracking.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { UserAuthFormComponent } from './components/user-auth-form/user-auth-form.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ToDoComponent } from './components/to-do/to-do.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'signin', component: UserAuthFormComponent, data: { type: 'sign-in' } },
  { path: 'signup', component: UserAuthFormComponent, data: { type: 'sign-up' } },
  { path: 'home', component: HomePageComponent },
  { path: 'balance', component: BalanceTrackingComponent },
  {path:'expense',component:ExpensesComponent},
  {path:'todo',component:ToDoComponent},
  { path: 'transactions', component: TransactionsComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' } ,// Redirect to home page on any unknown paths

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
