package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.ToDo;
import com.Fullstack.MoneySafe.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoServiceImpl implements ToDoServiceInit{

    @Autowired
    private ToDoRepository repository;

    @Override
    public List<ToDo> getToDoByMonth(String month) {
        return repository.findByMonth(month);
    }

    @Override
    public ToDo saveToDo(ToDo toDo) {
        return repository.save(toDo);
    }
}
