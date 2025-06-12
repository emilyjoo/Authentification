package ma.stepbystep.loginregistration.Controller;

import ma.stepbystep.loginregistration.Dto.CourseDTO;
import ma.stepbystep.loginregistration.Dto.CourseResponseDTO;
import ma.stepbystep.loginregistration.Entity.Course;
import ma.stepbystep.loginregistration.Entity.Instructor;
import ma.stepbystep.loginregistration.Service.CourseService;
import jakarta.validation.Valid;
import ma.stepbystep.loginregistration.Service.InstructorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@Validated
public class CourseController {
    private final CourseService courseService;
    private final InstructorService instructorService;


    public CourseController(CourseService courseService, InstructorService instructorService) {
        this.courseService = courseService;
        this.instructorService = instructorService;

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
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @Valid @RequestBody Course course, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        return ResponseEntity.ok(courseService.updateCourse(id, course));
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

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Course>> getCoursesByInstructorId(@PathVariable Long instructorId) {
        return ResponseEntity.ok(courseService.getCoursesByInstructorId(instructorId));
    }

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
}