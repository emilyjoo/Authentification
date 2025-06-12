package ma.stepbystep.loginregistration.exception;


public class InstructorNotFoundException extends RuntimeException {
    public InstructorNotFoundException(Long id) {
        super("Instructor not found with id: " + id);
    }

    public InstructorNotFoundException(String message) {
        super(message);
    }

    public InstructorNotFoundException(Long id, String customMessage) {
        super("Instructor not found with id: " + id + ". " + customMessage);
    }
}

