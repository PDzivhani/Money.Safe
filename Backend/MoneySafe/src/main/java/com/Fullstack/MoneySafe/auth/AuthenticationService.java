package com.Fullstack.MoneySafe.auth;

import com.Fullstack.MoneySafe.config.JwtService;
import com.Fullstack.MoneySafe.entity.User;
import com.Fullstack.MoneySafe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private UserRepository repository;

    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setEmail(request.getEmail());
        user.setImage(request.getImage());
        user.setPassword(passwordEncoder.encode(request.getPassword()));


        repository.save(user);

        String token = jwtService.generateTokenWithId(user.getFirstName(), user.getLastName(), user.getEmail(),user,user.getUserId());
        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthenticationResponse(token, refreshToken, "User registered successfully");
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateTokenWithId(user.getFirstName(), user.getLastName(), user.getEmail(),user,user.getUserId());
        String refreshToken = jwtService.generateRefreshToken(user);


        return new AuthenticationResponse(token, refreshToken, "User authenticated successfully");
    }

    public User save(User user) {
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return repository.save(user);
    }
}
