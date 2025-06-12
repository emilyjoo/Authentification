package ma.stepbystep.loginregistration.Service;

import ma.stepbystep.loginregistration.Dto.CourseResponseDTO;
import ma.stepbystep.loginregistration.Entity.Course;

import java.util.List;

public interface CourseService {
    Course createCourse(Course course);
    Course updateCourse(Long id, Course course);
    void deleteCourse(Long id);
    List<Course> getAllCourses();
    Course getCourseById(Long id);
    List<Course> getCoursesByInstructorId(Long instructorId);
    List<CourseResponseDTO> getCoursesForDisplay();
}
