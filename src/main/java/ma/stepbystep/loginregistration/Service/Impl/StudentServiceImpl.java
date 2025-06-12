package ma.stepbystep.loginregistration.Service.Impl;

import ma.stepbystep.loginregistration.Entity.Student;
import ma.stepbystep.loginregistration.exception.DuplicateEmailException;
import ma.stepbystep.loginregistration.exception.StudentNotFoundException;
import ma.stepbystep.loginregistration.Repo.StudentRepository;
import ma.stepbystep.loginregistration.Service.StudentService;
import ma.stepbystep.loginregistration.exception.UserNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student createStudent(Student student) {
        try {
            // Check if student with this email already exists
            if (studentRepository.findByEmail(student.getEmail()).isPresent()) {
                throw new RuntimeException("Student with email " + student.getEmail() + " already exists");
            }

            return studentRepository.save(student);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create student: " + e.getMessage());
        }
    }

    public Student updateStudent(Long id, Student student) {
        try {
            Student existingStudent = getStudentById(id);

            // Check if email is being changed and if new email already exists
            if (!existingStudent.getEmail().equals(student.getEmail())) {
                if (studentRepository.findByEmail(student.getEmail()).isPresent()) {
                    throw new RuntimeException("Student with email " + student.getEmail() + " already exists");
                }
            }

            existingStudent.setEmail(student.getEmail());
            existingStudent.setName(student.getName());

            return studentRepository.save(existingStudent);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update student: " + e.getMessage());
        }
    }

    public void deleteStudent(Long id) {
        try {
            if (!studentRepository.existsById(id)) {
                throw new RuntimeException("Student with id " + id + " not found");
            }
            studentRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete student: " + e.getMessage());
        }
    }

    public List<Student> getAllStudents() {
        try {
            return studentRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve students: " + e.getMessage());
        }
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student with id " + id + " not found"));
    }

    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student with email " + email + " not found"));
    }

    public boolean existsByEmail(String email) {
        return studentRepository.findByEmail(email).isPresent();
    }

    public Student findByUserId(Long userId) {
        return studentRepository.findByUser_Id(userId)
                .orElseThrow(() -> new RuntimeException("Student with email " + userId + " not found"));
    }
}