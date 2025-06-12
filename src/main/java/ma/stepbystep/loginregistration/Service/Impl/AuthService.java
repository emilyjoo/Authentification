package ma.stepbystep.loginregistration.Service.Impl;

import ma.stepbystep.loginregistration.Dto.AuthResponse;
import ma.stepbystep.loginregistration.Dto.LoginRequest;
import ma.stepbystep.loginregistration.Entity.AppUser;
import ma.stepbystep.loginregistration.Entity.Role;
import ma.stepbystep.loginregistration.Entity.RoleName;
import ma.stepbystep.loginregistration.Repo.AppUserRepository;
import ma.stepbystep.loginregistration.Repo.RoleRepository;
import ma.stepbystep.loginregistration.security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private RoleRepository roleRepository;

    private final AuthenticationManager authenticationManager;
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(
            AuthenticationManager authenticationManager,
            AppUserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse login(LoginRequest loginRequest) {
        try {
            System.out.println("Authenticating user: " + loginRequest.getEmail());

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("Authentication successful");

            AppUser user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            System.out.println("User found: " + user.getUsername());
            System.out.println("User roles: " + user.getRoles());

            String token = tokenProvider.generateToken(authentication);
            System.out.println("Token generated successfully");

            AuthResponse response = new AuthResponse(
                    true,
                    token,
                    user.getId(),
                    user.getEmail(),
                    user.getUsername(),
                    user.getRoles(),
                    null
            );

            System.out.println("AuthResponse created successfully");
            return response;

        } catch (Exception e) {
            System.err.println("Login service error: " + e.getMessage());
            e.printStackTrace();
            return new AuthResponse(false, "Authentication failed: " + e.getMessage());
        }
    }

    public AuthResponse register(AppUser user) {
        try {
            System.out.println("Registering user: " + user.getEmail());
            System.out.println("User roles before processing: " + user.getRoles());

            if (userRepository.existsByEmail(user.getEmail())) {
                return new AuthResponse(false, "Email already in use");
            }

            // Handle role assignment
            Set<Role> userRoles;
            if (user.getRoles() != null && !user.getRoles().isEmpty()) {
                // User has roles assigned (from frontend role selection)
                System.out.println("User has roles assigned: " + user.getRoles());
                userRoles = user.getRoles();

                // Validate that the roles exist in database
                for (Role role : userRoles) {
                    Role dbRole = roleRepository.findById(role.getId())
                            .orElseThrow(() -> new RuntimeException("Role with ID " + role.getId() + " not found"));
                    System.out.println("Found role in DB: " + dbRole.getRoleName());
                }
            } else {
                // Default to USER role if no role specified
                System.out.println("No roles specified, defaulting to USER role");
                Role userRole = roleRepository.findByRoleName(RoleName.USER)
                        .orElseThrow(() -> new RuntimeException("Role USER not found"));
                userRoles = Set.of(userRole);
            }

            user.setRoles(userRoles);
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            System.out.println("Saving user with roles: " + user.getRoles());
            AppUser savedUser = userRepository.save(user);
            System.out.println("User saved successfully with roles: " + savedUser.getRoles());

            String token = tokenProvider.generateTokenFromUserId(savedUser.getId());

            return new AuthResponse(
                    true,
                    token,
                    savedUser.getId(),
                    savedUser.getEmail(),
                    savedUser.getUsername(),
                    savedUser.getRoles(),
                    null
            );
        } catch (Exception e) {
            System.err.println("Registration service error: " + e.getMessage());
            e.printStackTrace();
            return new AuthResponse(false, "Registration failed: " + e.getMessage());
        }
    }
}