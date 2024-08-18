package com.Fullstack.MoneySafe.repository;

import com.Fullstack.MoneySafe.entity.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionHistoryRespository extends JpaRepository<TransactionHistory, Long> {
    List<TransactionHistory> findByMonth(String month);
}
