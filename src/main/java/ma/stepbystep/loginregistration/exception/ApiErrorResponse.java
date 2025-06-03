package ma.stepbystep.loginregistration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.List;

public class ApiErrorResponse {
    private final LocalDateTime timestamp;
    private final int status;
    private final String error;
    private final List<String> messages;
    private final String path;

    private ApiErrorResponse(LocalDateTime timestamp, int status,
                             String error, List<String> messages, String path) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.messages = messages;
        this.path = path;
    }

    // Factory method with defaults
    public static ApiErrorResponse create(HttpStatus status, String error,
                                          List<String> messages, WebRequest request) {
        return new ApiErrorResponse(
                LocalDateTime.now(),  // Auto-set timestamp
                status.value(),
                error,
                messages,
                request.getDescription(false)
        );
    }

    // Getters
    public LocalDateTime getTimestamp() { return timestamp; }
    public int getStatus() { return status; }
    public String getError() { return error; }
    public List<String> getMessages() { return messages; }
    public String getPath() { return path; }
}