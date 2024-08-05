package com.Fullstack.MoneySafe.repository;

import com.Fullstack.MoneySafe.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByMonth(String month);
}
