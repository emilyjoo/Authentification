package ma.stepbystep.loginregistration.Controller;

import ma.stepbystep.loginregistration.Dto.EnrollmentDTO;
import ma.stepbystep.loginregistration.Dto.StudentCourseDTO;
import ma.stepbystep.loginregistration.Entity.Course;
import ma.stepbystep.loginregistration.Entity.Enrollment;
import ma.stepbystep.loginregistration.Service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/enrollments")
@Validated
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public ResponseEntity<?> createEnrollment(@Valid @RequestBody EnrollmentDTO enrollmentDTO) {
        try {
            Enrollment enrollment = enrollmentService.enrollStudent(
                    enrollmentDTO.getStudentId(),
                    enrollmentDTO.getCourseId(),
                    enrollmentDTO.getEnrollmentDate()
            );
            return new ResponseEntity<>(enrollment, HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEnrollment(@PathVariable Long id, @Valid @RequestBody Enrollment enrollment, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        return ResponseEntity.ok(enrollmentService.updateEnrollment(id, enrollment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStudentId(studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByCourseId(courseId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable Long id) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentById(id));
    }

    @GetMapping
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollments());
    }

    @GetMapping("/student/{studentId}/courses")
    public ResponseEntity<List<StudentCourseDTO>> getStudentCoursesWithDetails(@PathVariable Long studentId) {
        try {
            List<Enrollment> enrollments = enrollmentService.getEnrollmentsByStudentId(studentId);

            List<StudentCourseDTO> studentCourses = enrollments.stream()
                    .map(enrollment -> {
                        StudentCourseDTO dto = new StudentCourseDTO();
                        Course course = enrollment.getCourse();

                        dto.setId(course.getId());
                        dto.setName(course.getName());
                        dto.setDescription(course.getDescription());
                        dto.setInstructorName(course.getInstructor() != null ?
                                course.getInstructor().getUser().getUsername() : "Unknown");
                        dto.setEnrollmentDate(enrollment.getEnrollmentDate());
                        dto.setStartDate(course.getStartDate());
                        dto.setEndDate(course.getEndDate());
                        dto.setCategory(course.getCategory());
                        dto.setMaxStudents(course.getMaxStudents());
                        dto.setPrice(course.getPrice());

                        // Calculate status
                        LocalDate today = LocalDate.now();
                        if (course.getStartDate() != null && course.getEndDate() != null) {
                            if (today.isBefore(course.getStartDate())) {
                                dto.setStatus("upcoming");
                            } else if (today.isAfter(course.getEndDate())) {
                                dto.setStatus("completed");
                            } else {
                                dto.setStatus("active");
                            }
                        } else {
                            dto.setStatus("active");
                        }

                        return dto;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(studentCourses);
        } catch (Exception e) {
            System.err.println("Error fetching student courses: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}