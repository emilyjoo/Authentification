package ma.stepbystep.loginregistration.Controller;

import jakarta.validation.Valid;
import ma.stepbystep.loginregistration.Dto.AuthResponse;
import ma.stepbystep.loginregistration.Dto.LoginRequest;
import ma.stepbystep.loginregistration.Entity.AppUser;
import ma.stepbystep.loginregistration.Service.Impl.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8082") // frontend port
public class AuthController {


    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid AppUser user) {
        AuthResponse response = authService.register(user);
        return response.isSuccess() ?
                ResponseEntity.ok(response) :
                ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return response.isSuccess() ?
                    ResponseEntity.ok(response) :
                    ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            e.printStackTrace(); // log it!
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(false, "An unexpected error occurred"));
        }
    }



}

