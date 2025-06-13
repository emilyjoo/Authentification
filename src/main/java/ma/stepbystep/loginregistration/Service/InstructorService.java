package ma.stepbystep.loginregistration.Service;
import ma.stepbystep.loginregistration.Entity.Instructor;

import java.util.List;

public interface InstructorService {
    Instructor createInstructor(Instructor instructor);
    Instructor updateInstructor(Long id, Instructor instructor);
    void deleteInstructor(Long id);
    List<Instructor> getAllInstructors();
    Instructor getInstructorById(Long id);
    boolean instructorExistsByUserId(Long userId);
    Instructor getInstructorByUserId(Long userId);
    public Instructor findByUserId(Long userId);


}
