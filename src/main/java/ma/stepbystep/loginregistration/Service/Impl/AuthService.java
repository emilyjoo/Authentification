package ma.stepbystep.loginregistration.Service.Impl;

import ma.stepbystep.loginregistration.Dto.AuthResponse;
import ma.stepbystep.loginregistration.Dto.LoginRequest;
import ma.stepbystep.loginregistration.Entity.AppUser;
import ma.stepbystep.loginregistration.Repo.AppUserRepository;
import ma.stepbystep.loginregistration.security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

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
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        AppUser user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = tokenProvider.generateToken(authentication);

        return new AuthResponse(
                true,
                token,
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getRoles(),
                null
        );
    }




    public AuthResponse register(AppUser user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return new AuthResponse(false, "Email already in use");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        AppUser savedUser = userRepository.save(user);

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
    }

}
