package ma.stepbystep.loginregistration.Service.Impl;

import ma.stepbystep.loginregistration.Dto.*;
import ma.stepbystep.loginregistration.Entity.Course;
import ma.stepbystep.loginregistration.Repo.CourseRepository;
import ma.stepbystep.loginregistration.Service.CourseService;
import ma.stepbystep.loginregistration.exception.CourseNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

            // Update fields only if they're not null
            if (course.getName() != null) {
                existingCourse.setName(course.getName());
            }
            if (course.getDescription() != null) {
                existingCourse.setDescription(course.getDescription());
            }
            if (course.getStartDate() != null) {
                existingCourse.setStartDate(course.getStartDate());
            }
            if (course.getEndDate() != null) {
                existingCourse.setEndDate(course.getEndDate());
            }
            if (course.getMaxStudents() != null) {
                existingCourse.setMaxStudents(course.getMaxStudents());
            }
            if (course.getPrice() != null) {
                existingCourse.setPrice(course.getPrice());
            }
            if (course.getCategory() != null) {
                existingCourse.setCategory(course.getCategory());
            }
            // Don't update instructor unless specifically provided
            if (course.getInstructor() != null) {
                existingCourse.setInstructor(course.getInstructor());
            }

            return courseRepository.save(existingCourse);
        } catch (Exception e) {
            System.err.println("Error updating course with ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional
    public Course updateCourse(Long id, CourseUpdateDTO courseDTO) {
        try {
            Course existingCourse = courseRepository.findById(id)
                    .orElseThrow(() -> new CourseNotFoundException(id));

            // Update fields from DTO
            existingCourse.setName(courseDTO.getName());
            existingCourse.setDescription(courseDTO.getDescription());
            existingCourse.setStartDate(courseDTO.getStartDate());
            existingCourse.setEndDate(courseDTO.getEndDate());
//            existingCourse.setMaxStudents(courseDTO.getMaxStudents());
//            existingCourse.setPrice(courseDTO.getPrice());
//            existingCourse.setCategory(courseDTO.getCategory());

            // Don't update instructor - keep existing

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

    public List<Course> findByInstructor_Id(Long instructorId) {
        return courseRepository.findByInstructorId(instructorId);
    }

    public List<InstructorCourseDTO> getCoursesDTOByInstructorId(Long instructorId) {
        System.out.println("Fetching courses DTOs for instructor ID: " + instructorId);
        return courseRepository.findCourseDTOsByInstructorId(instructorId);
    }

    public List<InstructorCourseDTO> getCoursesWithEnrollmentsByInstructorId(Long instructorId) {
        System.out.println("Fetching courses with enrollments for instructor ID: " + instructorId);

        List<Course> courses = courseRepository.findByInstructorIdWithEnrollments(instructorId);

            return courses.stream().map(course -> {
            InstructorCourseDTO dto = new InstructorCourseDTO();
            dto.setId(course.getId());
            dto.setName(course.getName());
            dto.setDescription(course.getDescription());
            dto.setStartDate(course.getStartDate() != null ? course.getStartDate().toString() : null);
            dto.setEndDate(course.getEndDate() != null ? course.getEndDate().toString() : null);
            dto.setEnrollmentCount(course.getEnrollments() != null ? course.getEnrollments().size() : 0);

            // Add the missing fields:
            dto.setCategory(course.getCategory());
            dto.setMaxStudents(course.getMaxStudents());
            dto.setPrice(course.getPrice());

            dto.setStatus(calculateCourseStatus(course.getStartDate(), course.getEndDate()));
            return dto;
        }).collect(Collectors.toList());
    }

    public List<InstructorCourseDTO> getCoursesWithSeparateCountByInstructorId(Long instructorId) {
        System.out.println("Fetching courses with separate count queries for instructor ID: " + instructorId);

        List<Course> courses = courseRepository.findByInstructorId(instructorId);

            return courses.stream().map(course -> {
            InstructorCourseDTO dto = new InstructorCourseDTO();
            dto.setId(course.getId());
            dto.setName(course.getName());
            dto.setDescription(course.getDescription());
            dto.setStartDate(course.getStartDate() != null ? course.getStartDate().toString() : null);
            dto.setEndDate(course.getEndDate() != null ? course.getEndDate().toString() : null);

            // Use separate count query
            Long count = courseRepository.countEnrollmentsByCourseId(course.getId());
            dto.setEnrollmentCount(count != null ? count.intValue() : 0);

            // Add the missing fields:
            dto.setCategory(course.getCategory());
            dto.setMaxStudents(course.getMaxStudents());
            dto.setPrice(course.getPrice());

            dto.setStatus(calculateCourseStatus(course.getStartDate(), course.getEndDate()));
            return dto;
        }).collect(Collectors.toList());
    }

    private String calculateCourseStatus(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            return "active";
        }

        LocalDate today = LocalDate.now();
        if (today.isBefore(startDate)) {
            return "upcoming";
        } else if (today.isAfter(endDate)) {
            return "completed";
        } else {
            return "active";
        }
    }
}