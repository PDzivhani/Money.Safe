package com.Fullstack.MoneySafe.services;

import com.Fullstack.MoneySafe.entity.User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.List;
import java.util.Optional;

public interface UserServiceInit {
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
    User findByGEmail(String email);
    List<User> findAll();
    void save(User user);
    void delete(User user);

    //google auth
    OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException;
}
