package ma.stepbystep.loginregistration.Service;

import ma.stepbystep.loginregistration.Dto.CourseResponseDTO;
import ma.stepbystep.loginregistration.Dto.InstructorCourseDTO;
import ma.stepbystep.loginregistration.Entity.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseService {
    Course createCourse(Course course);
    Course updateCourse(Long id, Course course);
    void deleteCourse(Long id);
    List<Course> getAllCourses();
    Course getCourseById(Long id);
    List<Course> getCoursesByInstructorId(Long instructorId);
    List<CourseResponseDTO> getCoursesForDisplay();
    public List<Course> findByInstructor_Id(Long instructorId);
    public List<InstructorCourseDTO> getCoursesDTOByInstructorId(Long instructorId);
    public List<InstructorCourseDTO> getCoursesWithEnrollmentsByInstructorId(Long instructorId);
    public List<InstructorCourseDTO> getCoursesWithSeparateCountByInstructorId(Long instructorId);


}
