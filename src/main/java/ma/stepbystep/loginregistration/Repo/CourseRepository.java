package ma.stepbystep.loginregistration.Repo;

import ma.stepbystep.loginregistration.Dto.InstructorCourseDTO;
import ma.stepbystep.loginregistration.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // This method finds courses by instructor's database ID
    List<Course> findByInstructorId(Long instructorId);

    // Method to find courses by instructor's user ID (corrected query)
    @Query("SELECT c FROM Course c WHERE c.instructor.user.id = :userId")
    List<Course> findByInstructorUserId(@Param("userId") Long userId);

    // Alternative method using method naming convention (if your entities support it)
    // List<Course> findByInstructorUserId(Long userId);

    // You might also want this method for finding by instructor entity
    List<Course> findByInstructor_Id(Long instructorId);

    // Query with eager fetching of enrollments
    @Query("SELECT c FROM Course c LEFT JOIN FETCH c.enrollments WHERE c.instructor.id = :instructorId")
    List<Course> findByInstructorIdWithEnrollments(@Param("instructorId") Long instructorId);

    // Count enrollments for a specific course
    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.id = :courseId")
    Long countEnrollmentsByCourseId(@Param("courseId") Long courseId);

    // Direct DTO projection query (most efficient for dashboard)
    @Query("SELECT new ma.stepbystep.loginregistration.Dto.InstructorCourseDTO(" +
            "c.id, c.name, c.description, c.startDate, c.endDate, COUNT(e)) " +
            "FROM Course c LEFT JOIN c.enrollments e " +
            "WHERE c.instructor.id = :instructorId " +
            "GROUP BY c.id, c.name, c.description, c.startDate, c.endDate")
    List<InstructorCourseDTO> findCourseDTOsByInstructorId(@Param("instructorId") Long instructorId);
}
