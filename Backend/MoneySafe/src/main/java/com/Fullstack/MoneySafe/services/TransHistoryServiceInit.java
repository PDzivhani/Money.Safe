package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.TransactionHistory;

import java.util.List;

public interface TransHistoryServiceInit {
    List<TransactionHistory> getTransactionsByMonth(String month);

    Double calculateTotalExpense(String month);
}
