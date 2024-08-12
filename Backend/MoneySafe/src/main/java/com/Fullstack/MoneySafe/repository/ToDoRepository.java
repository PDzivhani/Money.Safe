package com.Fullstack.MoneySafe.repository;

import com.Fullstack.MoneySafe.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    List<ToDo> findByMonth(String month);
}
