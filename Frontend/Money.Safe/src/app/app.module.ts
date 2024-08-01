import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BalanceTrackingComponent } from './components/balance-tracking/balance-tracking.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { UserAuthFormComponent } from './components/user-auth-form/user-auth-form.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ToDoComponent } from './components/to-do/to-do.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LandingPageComponent,
    BalanceTrackingComponent,
    CalculatorComponent,
    SideNavComponent,
    UserAuthFormComponent,
    ToolBarComponent,
    TransactionsComponent,
    ExpensesComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
