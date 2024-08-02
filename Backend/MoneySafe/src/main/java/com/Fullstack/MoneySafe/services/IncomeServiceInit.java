package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.Income;

import java.util.List;

public interface IncomeServiceInit {
    List<Income> getIncomesByMonth(String month);
    Income saveIncome(Income income);
    void deleteIncome(Long id);
}
