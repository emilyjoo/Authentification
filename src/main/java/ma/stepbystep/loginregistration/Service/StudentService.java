package ma.stepbystep.loginregistration.Service;
import ma.stepbystep.loginregistration.Entity.Student;

import java.util.List;

public interface StudentService {
    Student createStudent(Student student);
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
    List<Student> getAllStudents();
    Student getStudentById(Long id);
}
