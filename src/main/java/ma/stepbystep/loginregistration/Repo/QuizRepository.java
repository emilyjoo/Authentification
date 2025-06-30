package ma.stepbystep.loginregistration.Repo;

import ma.stepbystep.loginregistration.Entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByCourseId(Long courseId);
    List<Quiz> findByCourse_Instructor_Id(Long instructorId);

    // Optional: More specific query if needed
    @Query("SELECT q FROM Quiz q WHERE q.course.instructor.id = :instructorId ORDER BY q.course.name, q.title")
    List<Quiz> findQuizzesByInstructorIdOrdered(@Param("instructorId") Long instructorId);
}


