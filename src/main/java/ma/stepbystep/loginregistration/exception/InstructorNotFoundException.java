package ma.stepbystep.loginregistration.exception;


public class InstructorNotFoundException extends RuntimeException {
    public InstructorNotFoundException(Long id) {
        super("Instructor not found with id: " + id);
    }
}

