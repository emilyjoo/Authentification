package ma.stepbystep.loginregistration.Dto;

import ma.stepbystep.loginregistration.Entity.Role;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponse {
    @JsonProperty("success")
    private boolean success;

    @JsonProperty("token")
    private String token;

    @JsonProperty("userId")
    private Long userId;

    @JsonProperty("email")
    private String email;

    @JsonProperty("username")
    private String username;

    @JsonProperty("roles")
    private Set<Role> roles;

    @JsonProperty("message")
    private String message;

    // Constructor matching the login method
    public AuthResponse(boolean success, String token, Long userId, String email, String username, Set<Role> roles, String message) {
        this.success = success;
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.username = username;
        this.roles = roles;
        this.message = message;
    }

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // Add all getters
    public boolean isSuccess() {
        return success;
    }

    public String getToken() {
        return token;
    }

    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public String getMessage() {
        return message;
    }

    // Add setters if needed
    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}