package com.Fullstack.MoneySafe.controller;

import com.Fullstack.MoneySafe.entity.Income;
import com.Fullstack.MoneySafe.services.IncomeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/income")
public class IncomeController {
    @Autowired
    private IncomeServiceImpl incomeService;

    @GetMapping("/{month}")
    public ResponseEntity<List<Income>> getIncomesByMonth(@PathVariable String month) {
        List<Income> incomes = incomeService.getIncomesByMonth(month);
        return ResponseEntity.ok(incomes);
    }

    @PostMapping
    public ResponseEntity<Income> addIncome(@RequestBody Income income) {
        Income savedIncome = incomeService.saveIncome(income);
        return ResponseEntity.ok(savedIncome);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }
}
