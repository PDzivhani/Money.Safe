package com.Fullstack.MoneySafe.controller;

import com.Fullstack.MoneySafe.entity.ToDo;
import com.Fullstack.MoneySafe.services.ToDoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todo")
public class ToDoController {

    @Autowired
    private ToDoServiceImpl toDoService;

    @GetMapping("/{month}")
    public ResponseEntity<List<ToDo>> getToDoByMonth(@PathVariable String month) {
        List<ToDo> toDoList = toDoService.getToDoByMonth(month);
        return ResponseEntity.ok(toDoList);
    }

    @PostMapping
    public ResponseEntity<ToDo> addToDo(@RequestBody ToDo toDo) {
        ToDo savedToDo = toDoService.saveToDo(toDo);
        return ResponseEntity.ok(savedToDo);
    }
}
