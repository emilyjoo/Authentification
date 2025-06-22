package ma.stepbystep.loginregistration.Service.Impl;


import lombok.RequiredArgsConstructor;
import ma.stepbystep.loginregistration.Entity.Course;
import ma.stepbystep.loginregistration.Entity.Enrollment;
import ma.stepbystep.loginregistration.Entity.Student;
import ma.stepbystep.loginregistration.Repo.CourseRepository;
import ma.stepbystep.loginregistration.Repo.StudentRepository;
import ma.stepbystep.loginregistration.exception.EnrollmentNotFoundException;
import ma.stepbystep.loginregistration.Repo.EnrollmentRepository;
import ma.stepbystep.loginregistration.Service.EnrollmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository; // Must be final
    private final CourseRepository courseRepository;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository, StudentRepository studentRepository, CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    @Transactional
    public Enrollment enrollStudent(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    @Override
    @Transactional
    public Enrollment updateEnrollment(Long id, Enrollment enrollment) {
        Enrollment existingEnrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new EnrollmentNotFoundException(id));

        existingEnrollment.setCourse(enrollment.getCourse());
        existingEnrollment.setStudent(enrollment.getStudent());
        existingEnrollment.setEnrollmentDate(enrollment.getEnrollmentDate());
        return enrollmentRepository.save(existingEnrollment);
    }

    @Override
    @Transactional
    public void deleteEnrollment(Long id) {
        if (!enrollmentRepository.existsById(id)) {
            throw new EnrollmentNotFoundException(id);
        }
        enrollmentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Enrollment> getEnrollmentsByStudentId(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Enrollment> getEnrollmentsByCourseId(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    @Override
    @Transactional(readOnly = true)
    public Enrollment getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new EnrollmentNotFoundException(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Enrollment enrollStudent(Long studentId, Long courseId, LocalDate enrollmentDate) {
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId);

        if (existingEnrollment.isPresent()) {
            throw new IllegalStateException("Student is already enrolled in this course");
        }
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(enrollmentDate);

        return enrollmentRepository.save(enrollment);
    }

    public int countByCourseId(Long courseId) {
        return enrollmentRepository.countByCourseId(courseId);
    }
}
