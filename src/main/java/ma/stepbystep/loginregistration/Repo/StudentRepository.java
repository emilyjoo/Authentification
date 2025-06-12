package ma.stepbystep.loginregistration.Repo;

import ma.stepbystep.loginregistration.Entity.Enrollment;
import ma.stepbystep.loginregistration.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s JOIN s.enrollments e WHERE e.course.id = :id")
    List<Student> findByCourseId(@Param("id") Long id);


    /**
     * Find student by email address
     * @param email the email to search for
     * @return Optional containing the student if found
     */
    Optional<Student> findByEmail(String email);

    /**
     * Check if a student exists with the given email
     * @param email the email to check
     * @return true if student exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Find student by email (case insensitive)
     * @param email the email to search for
     * @return Optional containing the student if found
     */
    @Query("SELECT s FROM Student s WHERE LOWER(s.email) = LOWER(:email)")
    Optional<Student> findByEmailIgnoreCase(@Param("email") String email);

    Optional<Student> findByUser_Id(Long userId);
}
