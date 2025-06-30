package ma.stepbystep.loginregistration.Repo;

import ma.stepbystep.loginregistration.Entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByCourseIdOrderByLessonOrderAsc(Long courseId);
    List<Lesson> findByCourse_Instructor_Id(Long instructorId);
    @Query("SELECT l FROM Lesson l WHERE l.course.instructor.id = :instructorId ORDER BY l.course.name, l.lessonOrder")
    List<Lesson> findLessonsByInstructorIdOrdered(@Param("instructorId") Long instructorId);
}

