package com.Fullstack.MoneySafe.controller;

import com.Fullstack.MoneySafe.entity.Expense;
import com.Fullstack.MoneySafe.services.ExpenseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseServiceImpl expenseService;


    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }

    @GetMapping("/{month}")
    public List<Expense> getExpensesByMonth(@PathVariable String month) {
        return expenseService.getExpensesByMonth(month);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }
}
