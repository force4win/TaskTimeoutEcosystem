package com.alv.aa.cuarllo.LoginJWT.service;

import com.alv.aa.cuarllo.LoginJWT.model.User;
import com.alv.aa.cuarllo.LoginJWT.repository.RoleRepository;
import com.alv.aa.cuarllo.LoginJWT.repository.UserRepository;
import com.alv.aa.cuarllo.LoginJWT.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtUtil.generateToken(authentication);
    }

    public User register(String username, String password, Set<String> strRoles) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        // Create new user's account
        User user = new User(username,
                passwordEncoder.encode(password),
                new HashSet<>());

        strRoles.forEach(role -> {
            switch (role) {
                case "admin":
                    roleRepository.findByName("ROLE_ADMIN")
                            .ifPresent(user.getRoles()::add);
                    break;
                case "mod":
                    roleRepository.findByName("ROLE_MODERATOR")
                            .ifPresent(user.getRoles()::add);
                    break;
                default:
                    roleRepository.findByName("ROLE_USER")
                            .ifPresent(user.getRoles()::add);
            }
        });

        return userRepository.save(user);
    }

    public boolean validateToken(String token) {
        return jwtUtil.validateJwtToken(token);
    }
}
