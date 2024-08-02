package com.Fullstack.MoneySafe.repository;

import com.Fullstack.MoneySafe.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByMonth(String month);
}