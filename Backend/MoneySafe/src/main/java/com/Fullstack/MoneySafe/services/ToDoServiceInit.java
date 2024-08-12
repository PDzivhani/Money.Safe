package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.ToDo;

import java.util.List;

public interface ToDoServiceInit {

    /**
     * Get all transactions for a given month.
     *
     * @param month the month to filter transactions by
     * @return a list of transactions for the specified month
     */
    List<ToDo> getToDoByMonth(String month);

    /**
     * Save a new transaction.
     *
     * @param toDo the transaction to save
     * @return the saved transaction
     */
    ToDo saveToDo(ToDo toDo);
}
