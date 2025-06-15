package ma.stepbystep.loginregistration.Controller;

import ma.stepbystep.loginregistration.Dto.*;
import ma.stepbystep.loginregistration.Entity.Course;
import ma.stepbystep.loginregistration.Entity.Enrollment;
import ma.stepbystep.loginregistration.Entity.Instructor;
import ma.stepbystep.loginregistration.Entity.Student;
import ma.stepbystep.loginregistration.Service.CourseService;
import jakarta.validation.Valid;
import ma.stepbystep.loginregistration.Service.EnrollmentService;
import ma.stepbystep.loginregistration.Service.InstructorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
@Validated
public class CourseController {
    private final CourseService courseService;
    private final InstructorService instructorService;
    private final EnrollmentService enrollmentService;


    public CourseController(CourseService courseService, InstructorService instructorService, EnrollmentService enrollmentService) {
        this.courseService = courseService;
        this.instructorService = instructorService;
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public ResponseEntity<?> createCourse(@Valid @RequestBody CourseDTO courseDTO, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        Instructor instructor = instructorService.getInstructorById(courseDTO.getInstructorId());
        if (instructor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Instructor not found");
        }

        Course course = new Course();
        course.setName(courseDTO.getName());
        course.setDescription(courseDTO.getDescription());
        course.setStartDate(courseDTO.getStartDate());
        course.setEndDate(courseDTO.getEndDate());
        course.setMaxStudents(courseDTO.getMaxStudents());
        course.setPrice(courseDTO.getPrice());
        course.setCategory(courseDTO.getCategory());
        course.setInstructor(instructor);

        Course createdCourse = courseService.createCourse(course);
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseUpdateDTO courseDTO, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        try {
            Course updatedCourse = courseService.updateCourse(id, courseDTO);
            return ResponseEntity.ok(updatedCourse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating course: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

//    @GetMapping
//    public ResponseEntity<List<Course>> getAllCourses() {
//        return ResponseEntity.ok(courseService.getAllCourses());
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

//    @GetMapping("/instructor/{instructorId}")
//    public ResponseEntity<List<InstructorCourseDTO>> getCoursesByInstructorId(@PathVariable Long instructorId) {
//        try {
//            System.out.println("Fetching courses for instructor ID: " + instructorId);
//
//            List<Course> courses = courseService.getCoursesByInstructorId(instructorId);
//            System.out.println("Found " + courses.size() + " courses");
//
//            List<InstructorCourseDTO> dtos = courses.stream().map(course -> {
//                InstructorCourseDTO dto = new InstructorCourseDTO();
//                dto.setId(course.getId());
//                dto.setName(course.getName());
//                dto.setDescription(course.getDescription());
//                dto.setStartDate(course.getStartDate() != null ? course.getStartDate().toString() : null);
//                dto.setEndDate(course.getEndDate() != null ? course.getEndDate().toString() : null);
//
//                // Safely get enrollment count
//                int enrollmentCount = 0;
//                try {
//                    if (course.getEnrollments() != null) {
//                        enrollmentCount = course.getEnrollments().size();
//                    }
//                } catch (Exception e) {
//                    System.out.println("Could not load enrollments, using count 0");
//                    enrollmentCount = 0;
//                }
//                dto.setEnrollmentCount(enrollmentCount);
//
//                // Set status based on dates
//                LocalDate today = LocalDate.now();
//                if (course.getStartDate() != null && course.getEndDate() != null) {
//                    if (today.isBefore(course.getStartDate())) {
//                        dto.setStatus("upcoming");
//                    } else if (today.isAfter(course.getEndDate())) {
//                        dto.setStatus("completed");
//                    } else {
//                        dto.setStatus("active");
//                    }
//                } else {
//                    dto.setStatus("active"); // default status
//                }
//
//                return dto;
//            }).collect(Collectors.toList());
//
//            System.out.println("Returning " + dtos.size() + " DTOs");
//            return ResponseEntity.ok(dtos);
//
//        } catch (Exception e) {
//            System.err.println("Error in getCoursesByInstructorId: " + e.getMessage());
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().build();
//        }
//    }

    @GetMapping
    public ResponseEntity<List<CourseResponseDTO>> getAllCourses() {
        try {
            System.out.println("Fetching all courses for display...");
            List<CourseResponseDTO> courses = courseService.getCoursesForDisplay();
            System.out.println("Fetched " + courses.size() + " courses");

            // Debug: Print first course structure
            if (!courses.isEmpty()) {
                CourseResponseDTO firstCourse = courses.get(0);
                System.out.println("First course: " + firstCourse.getName() +
                        " (ID: " + firstCourse.getId() +
                        ", Instructor: " + (firstCourse.getInstructor() != null ? firstCourse.getInstructor().getName() : "null") +
                        ", Specialization: " + (firstCourse.getInstructor() != null ? firstCourse.getInstructor().getSpecialization() : "null") +
                        ", Enrollments: " + firstCourse.getEnrollmentCount() + ")");
            }

            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            System.err.println("Error fetching courses: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<InstructorCourseDTO>> getCoursesByInstructorId(@PathVariable Long instructorId) {
        try {
            System.out.println("Fetching courses for instructor ID: " + instructorId);

            List<Course> courses = courseService.getCoursesByInstructorId(instructorId);
            System.out.println("Found " + courses.size() + " courses");

            List<InstructorCourseDTO> dtos = courses.stream().map(course -> {
                InstructorCourseDTO dto = new InstructorCourseDTO();
                dto.setId(course.getId());
                dto.setName(course.getName());
                dto.setDescription(course.getDescription());
                dto.setStartDate(course.getStartDate() != null ? course.getStartDate().toString() : null);
                dto.setEndDate(course.getEndDate() != null ? course.getEndDate().toString() : null);

                // CHANGE THIS PART - Don't try to access enrollments directly
                dto.setEnrollmentCount(0);// Set to 0 for now, or use a separate service call
                dto.setCategory(course.getCategory());
                dto.setMaxStudents(course.getMaxStudents());
                dto.setPrice(course.getPrice());
                // Set status based on dates
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
            }).collect(Collectors.toList());

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            System.err.println("Error in getCoursesByInstructorId: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{courseId}/students")
    public ResponseEntity<List<StudentDTO>> getStudentsByCourseId(@PathVariable Long courseId) {
        try {
            List<Enrollment> enrollments = enrollmentService.getEnrollmentsByCourseId(courseId);
            List<StudentDTO> students = enrollments.stream()
                    .map(enrollment -> {
                        Student student = enrollment.getStudent();
                        StudentDTO dto = new StudentDTO();
                        dto.setId(student.getId());
                        dto.setName(student.getUser().getUsername()); // or however you get the name
                        dto.setEmail(student.getUser().getEmail());
                        dto.setEnrollmentDate(enrollment.getEnrollmentDate());
                        return dto;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            System.err.println("Error fetching students for course " + courseId + ": " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/instructor/{instructorId}/with-enrollments")
    public ResponseEntity<List<InstructorCourseDTO>> getCoursesWithEnrollments(@PathVariable Long instructorId) {
        try {
            System.out.println("Fetching courses with enrollments for instructor ID: " + instructorId);

            List<InstructorCourseDTO> courses = courseService.getCoursesWithEnrollmentsByInstructorId(instructorId);

            System.out.println("Successfully fetched " + courses.size() + " courses with enrollments");
            return ResponseEntity.ok(courses);

        } catch (Exception e) {
            System.err.println("Error in getCoursesWithEnrollments: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/instructor/{instructorId}/separate-count")
    public ResponseEntity<List<InstructorCourseDTO>> getCoursesWithSeparateCount(@PathVariable Long instructorId) {
        try {
            System.out.println("Fetching courses with separate count for instructor ID: " + instructorId);

            List<InstructorCourseDTO> courses = courseService.getCoursesWithSeparateCountByInstructorId(instructorId);

            System.out.println("Successfully fetched " + courses.size() + " courses with separate counts");
            return ResponseEntity.ok(courses);

        } catch (Exception e) {
            System.err.println("Error in getCoursesWithSeparateCount: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}