package com.Fullstack.MoneySafe.controller;

import com.Fullstack.MoneySafe.entity.TransactionHistory;
import com.Fullstack.MoneySafe.services.TransHistoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transHistory")
public class TransHistoryController {

    @Autowired
    private TransHistoryServiceImpl transactionService;

    @GetMapping("/transactions")
    public List<TransactionHistory> getTransactions(@RequestParam String month) {
        return transactionService.getTransactionsByMonth(month);
    }

    @GetMapping("/transactions/total")
    public Double getTotalExpense(@RequestParam String month) {
        return transactionService.calculateTotalExpense(month);
    }
}
