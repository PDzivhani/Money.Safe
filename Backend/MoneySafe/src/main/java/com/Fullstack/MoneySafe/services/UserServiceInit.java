package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserServiceInit {
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
    List<User> findAll();
    void save(User user);
    void delete(User user);
}
