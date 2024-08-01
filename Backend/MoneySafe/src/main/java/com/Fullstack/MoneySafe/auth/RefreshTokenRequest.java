package com.Fullstack.MoneySafe.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO for handling refresh token requests.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenRequest {
    // The refresh token provided by the client.
    private String refreshToken;
}

