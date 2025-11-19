package com.alv.aa.cuarllo.LoginJWT.config;

import com.alv.aa.cuarllo.LoginJWT.model.Role;
import com.alv.aa.cuarllo.LoginJWT.model.User;
import com.alv.aa.cuarllo.LoginJWT.repository.RoleRepository;
import com.alv.aa.cuarllo.LoginJWT.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize Roles
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            roleRepository.save(new Role("ROLE_USER"));
        }
        if (roleRepository.findByName("ROLE_MODERATOR").isEmpty()) {
            roleRepository.save(new Role("ROLE_MODERATOR"));
        }
        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            roleRepository.save(new Role("ROLE_ADMIN"));
        }

        // Initialize Admin User
        if (userRepository.findByUsername("admin").isEmpty()) {
            Set<Role> roles = new HashSet<>();
            roleRepository.findByName("ROLE_ADMIN").ifPresent(roles::add);
            roleRepository.findByName("ROLE_USER").ifPresent(roles::add);

            User admin = new User("admin", passwordEncoder.encode("admin123"), roles);
            userRepository.save(admin);
        }

        // Initialize Test User
        if (userRepository.findByUsername("user").isEmpty()) {
            Set<Role> roles = new HashSet<>();
            roleRepository.findByName("ROLE_USER").ifPresent(roles::add);

            User user = new User("user", passwordEncoder.encode("password"), roles);
            userRepository.save(user);
        }

        // Initialize Console User
        if (userRepository.findByUsername("consoleuser").isEmpty()) {
            Set<Role> roles = new HashSet<>();
            roleRepository.findByName("ROLE_USER").ifPresent(roles::add);

            User consoleUser = new User("consoleuser", passwordEncoder.encode("975311"), roles);
            userRepository.save(consoleUser);
        }
    }
}
