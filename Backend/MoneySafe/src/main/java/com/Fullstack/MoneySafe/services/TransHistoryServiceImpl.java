package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.TransactionHistory;
import com.Fullstack.MoneySafe.repository.TransactionHistoryRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransHistoryServiceImpl implements TransHistoryServiceInit {
    @Autowired
    private TransactionHistoryRespository transactionRepository;

    @Override
    public List<TransactionHistory> getTransactionsByMonth(String month) {
        return transactionRepository.findByMonth(month);
    }

    @Override
    public Double calculateTotalExpense(String month) {
        return transactionRepository.findByMonth(month).stream()
                .mapToDouble(TransactionHistory::getExpenseAmount)
                .sum();
    }
}
