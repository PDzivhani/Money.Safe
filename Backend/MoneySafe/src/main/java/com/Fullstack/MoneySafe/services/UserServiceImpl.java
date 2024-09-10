package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.User;
import com.Fullstack.MoneySafe.enums.AuthProvider;
import com.Fullstack.MoneySafe.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl extends DefaultOAuth2UserService implements UserDetailsService, UserServiceInit {

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

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Extract user information from the OAuth2User
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Check if the user already exists in the database
        User user = repository.findByEmail(email)
                .orElseGet(() -> {
                    // If user does not exist, create a new one
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setFirstName(name);
                    newUser.setProvider(AuthProvider.GOOGLE); // AuthProvider.GOOGLE is defined
                    newUser.setPassword(""); // OAuth2 users may not need a password, or you can set a dummy one
                    return repository.save(newUser);
                });

        // Return a new OAuth2User with the necessary details and authorities
        return new DefaultOAuth2User(
                Collections.singleton(new OAuth2UserAuthority(oAuth2User.getAttributes())),
                oAuth2User.getAttributes(),
                "email" // Use "email" as the key to extract user attributes
        );
    }

}
