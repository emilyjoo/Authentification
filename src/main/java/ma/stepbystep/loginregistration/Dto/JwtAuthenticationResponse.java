package ma.stepbystep.loginregistration.Dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JwtAuthenticationResponse {
    // Getters and Setters
    private String token;
    private Long id;
    private String email;
    private String username;

    public JwtAuthenticationResponse(String token, Long id, String email, String username) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.username = username;
    }

}