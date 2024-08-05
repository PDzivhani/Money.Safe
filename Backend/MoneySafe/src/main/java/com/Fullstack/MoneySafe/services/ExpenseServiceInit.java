package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.Expense;

import java.util.List;

public interface ExpenseServiceInit {
    Expense saveExpense(Expense expense);
    List<Expense> getExpensesByMonth(String month);
    List<Expense> getAllExpenses();
}
