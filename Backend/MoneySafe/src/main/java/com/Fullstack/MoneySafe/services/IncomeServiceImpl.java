package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.Income;
import com.Fullstack.MoneySafe.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeServiceImpl implements IncomeServiceInit{
    @Autowired
    private IncomeRepository incomeRepository;

    @Override
    public List<Income> getIncomesByMonth(String month) {
        return incomeRepository.findByMonth(month);
    }

    @Override
    public Income saveIncome(Income income) {
        return incomeRepository.save(income);
    }

    @Override
    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }
}
