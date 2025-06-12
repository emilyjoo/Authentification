package ma.stepbystep.loginregistration.Service.Impl;

import ma.stepbystep.loginregistration.Dto.CourseDTO;
import ma.stepbystep.loginregistration.Dto.CourseResponseDTO;
import ma.stepbystep.loginregistration.Dto.InstructorDTO;
import ma.stepbystep.loginregistration.Dto.InstructorResponseDTO;
import ma.stepbystep.loginregistration.Entity.Course;
import ma.stepbystep.loginregistration.Repo.CourseRepository;
import ma.stepbystep.loginregistration.Service.CourseService;
import ma.stepbystep.loginregistration.exception.CourseNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    @Transactional
    public Course createCourse(Course course) {
        try {
            Course savedCourse = courseRepository.save(course);
            System.out.println("Course created successfully with ID: " + savedCourse.getId());
            return savedCourse;
        } catch (Exception e) {
            System.err.println("Error creating course: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional
    public Course updateCourse(Long id, Course course) {
        try {
            Course existingCourse = courseRepository.findById(id)
                    .orElseThrow(() -> new CourseNotFoundException(id));

            // Update all fields
            existingCourse.setName(course.getName());
            existingCourse.setDescription(course.getDescription());
            existingCourse.setStartDate(course.getStartDate());
            existingCourse.setEndDate(course.getEndDate());
            existingCourse.setMaxStudents(course.getMaxStudents());
            existingCourse.setPrice(course.getPrice());
            existingCourse.setCategory(course.getCategory());
            existingCourse.setInstructor(course.getInstructor());

            return courseRepository.save(existingCourse);
        } catch (Exception e) {
            System.err.println("Error updating course with ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional
    public void deleteCourse(Long id) {
        try {
            if (!courseRepository.existsById(id)) {
                throw new CourseNotFoundException(id);
            }
            courseRepository.deleteById(id);
            System.out.println("Course deleted successfully with ID: " + id);
        } catch (Exception e) {
            System.err.println("Error deleting course with ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Course> getAllCourses() {
        try {
            List<Course> courses = courseRepository.findAll();
            System.out.println("Retrieved " + courses.size() + " courses from database");

            // Debug: Print each course
            for (Course course : courses) {
                System.out.println("Course: " + course.getId() + " - " + course.getName() +
                        " (Instructor: " + (course.getInstructor() != null ? course.getInstructor().getId() : "null") + ")");
            }

            return courses;
        } catch (Exception e) {
            System.err.println("Error retrieving all courses: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public List<CourseResponseDTO> getCoursesForDisplay() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    private CourseResponseDTO convertToResponseDTO(Course course) {
        // Create instructor DTO
        InstructorResponseDTO instructorDTO = new InstructorResponseDTO();
        instructorDTO.setId(course.getInstructor().getId());
        instructorDTO.setName(course.getInstructor().getName());
        instructorDTO.setSpecialization(course.getInstructor().getSpecialization() != null ?
                course.getInstructor().getSpecialization() : "General");

        // Create course response DTO
        CourseResponseDTO courseResponseDTO = new CourseResponseDTO();
        courseResponseDTO.setId(course.getId());
        courseResponseDTO.setName(course.getName());
        courseResponseDTO.setDescription(course.getDescription());
        courseResponseDTO.setInstructor(instructorDTO);
        courseResponseDTO.setStartDate(course.getStartDate());
        courseResponseDTO.setEndDate(course.getEndDate());
        courseResponseDTO.setEnrollmentCount(course.getEnrollments() != null ? course.getEnrollments().size() : 0);
        courseResponseDTO.setMaxStudents(course.getMaxStudents());
        courseResponseDTO.setPrice(course.getPrice());
        courseResponseDTO.setCategory(course.getCategory());

        return courseResponseDTO;
    }

    @Override
    @Transactional(readOnly = true)
    public Course getCourseById(Long id) {
        try {
            Course course = courseRepository.findById(id)
                    .orElseThrow(() -> new CourseNotFoundException(id));
            System.out.println("Retrieved course: " + course.getName());
            return course;
        } catch (Exception e) {
            System.err.println("Error retrieving course with ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Course> getCoursesByInstructorId(Long instructorId) {
        try {
            List<Course> courses = courseRepository.findByInstructorId(instructorId);
            System.out.println("Retrieved " + courses.size() + " courses for instructor ID: " + instructorId);
            return courses;
        } catch (Exception e) {
            System.err.println("Error retrieving courses for instructor ID " + instructorId + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}