package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.Expense;
import com.Fullstack.MoneySafe.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseServiceImpl implements ExpenseServiceInit{
    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getExpensesByMonth(String month) {
        return expenseRepository.findByMonth(month);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
}
