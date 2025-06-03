package ma.stepbystep.loginregistration.exception;

public class EnrollmentNotFoundException extends RuntimeException {
    public EnrollmentNotFoundException(Long id) {
        super("Enrollment not found with id: " + id);
    }
}
