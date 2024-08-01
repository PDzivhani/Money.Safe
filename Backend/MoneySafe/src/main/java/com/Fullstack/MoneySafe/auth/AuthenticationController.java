package com.Fullstack.MoneySafe.auth;

import com.Fullstack.MoneySafe.config.JwtService;
import com.Fullstack.MoneySafe.entity.User;
import com.Fullstack.MoneySafe.services.UserServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthenticationController {

    private final AuthenticationService service;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserServiceImpl userService;



    /**
     * Registers a new user.
     * @param request the registration request
     * @return a response indicating the result of the registration
     */
    @PostMapping("/register")
    public ResponseEntity<BaseResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthenticationResponse response = service.register(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ErrorResponse("Invalid name: " + request.getFirstName(), "Registration error"), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage(), "Registration error"), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Authenticates a user.
     * @param request the authentication request
     * @return a response indicating the result of the authentication
     */
    @PostMapping("/authenticate")
    public ResponseEntity<BaseResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse response = service.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage(), "Authentication error"), HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Gets all users.
     * @return a list of all users
     */
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    /**
     * Gets a user by ID.
     * @param id the ID of the user
     * @return the user or a not found response
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Finds a user by email.
     * @param email the email of the user
     * @return the user with the specified email
     */
    @GetMapping("/email/{email}")
    public Optional<User> findByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }


    /**
     * Updates user information.
     * @param id the ID of the user
     * @param userDetails the updated user details
     * @return a response indicating the result of the update
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User user = userService.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setPhoneNumber(userDetails.getPhoneNumber());
            user.setEmail(userDetails.getEmail());
            user.setImage(userDetails.getImage());

            // Uncomment this if password update is needed
            // if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            //     user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            // }

            userService.save(user);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Log the exception with a stack trace for better debugging
            // logger.error("An error occurred while updating the user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }



    /**
     * Deletes a user by ID.
     * @param userId the ID of the user to be deleted
     */
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long userId) {
        User user = userService.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        userService.delete(user);
    }

    /**
     * Refreshes the JWT token.
     * @param request the refresh token request
     * @return a response with the new token or an error response
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<BaseResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        try {
            String username = jwtService.extractUsername(request.getRefreshToken());
            String token = jwtService.generateTokenFromUsername(username);
            return ResponseEntity.ok(new AuthenticationResponse(token, request.getRefreshToken(), "Token refreshed successfully"));
        } catch (ExpiredJwtException e) {
            return new ResponseEntity<>(new ErrorResponse("Refresh token expired", "Refresh token error"), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage(), "Token error"), HttpStatus.BAD_REQUEST);
        }
    }

}
