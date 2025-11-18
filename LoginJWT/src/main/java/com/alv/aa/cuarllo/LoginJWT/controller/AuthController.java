package com.alv.aa.cuarllo.LoginJWT.controller;

import com.alv.aa.cuarllo.LoginJWT.model.User;
import com.alv.aa.cuarllo.LoginJWT.payload.request.LoginRequest;
import com.alv.aa.cuarllo.LoginJWT.payload.request.SignupRequest;
import com.alv.aa.cuarllo.LoginJWT.payload.request.TokenValidationRequest;
import com.alv.aa.cuarllo.LoginJWT.payload.response.JwtResponse;
import com.alv.aa.cuarllo.LoginJWT.payload.response.MessageResponse;
import com.alv.aa.cuarllo.LoginJWT.service.AuthService;
import com.alv.aa.cuarllo.LoginJWT.service.UserDetailsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserDetailsServiceImpl userDetailsService;

    public AuthController(AuthService authService, UserDetailsServiceImpl userDetailsService) {
        this.authService = authService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String jwt = authService.login(loginRequest.getUsername(), loginRequest.getPassword());

        User userDetails = (User) userDetailsService.loadUserByUsername(loginRequest.getUsername());
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        authService.register(signupRequest.getUsername(), signupRequest.getPassword(), signupRequest.getRole());
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/validateToken")
    public ResponseEntity<?> validateToken(@RequestBody TokenValidationRequest tokenValidationRequest) {
        boolean isValid = authService.validateToken(tokenValidationRequest.getToken());
        if (isValid) {
            return ResponseEntity.ok(new MessageResponse("Token is valid!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Token is invalid!"));
        }
    }
}
