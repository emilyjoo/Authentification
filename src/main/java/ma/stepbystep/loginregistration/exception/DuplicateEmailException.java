package ma.stepbystep.loginregistration.exception;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String email) {
        super("Instructor with email " + email + " already exists");
    }
}
