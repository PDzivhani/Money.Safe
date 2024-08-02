package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.User;
import com.Fullstack.MoneySafe.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserServiceInit {

    @Autowired
    private UserRepository repository;


    @Override
    // Method to find a user by email
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    // Method to find a user by email
    public User findByGEmail(String email) {
        return repository.findByGEmail(email);
    }

    // Method to get a user by their ID
    public User getUserById(Long id) {
        Optional<User> optional = repository.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new EntityNotFoundException("User with id " + id + " is not found");
        }
    }


    @Override
    // Method to find a user by ID
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }


    @Override
    // Method to retrieve all users
    public List<User> findAll() {
        return repository.findAll();
    }


    @Override
    // Method to save a user
    public void save(User user) {
        repository.save(user);
    }


    @Override
    // Method to delete a user
    public void delete(User user) {
        repository.delete(user);
    }


    // Method required by UserDetailsService to load user by email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
