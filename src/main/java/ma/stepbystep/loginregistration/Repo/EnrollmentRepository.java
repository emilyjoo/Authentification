package ma.stepbystep.loginregistration.Repo;

import ma.stepbystep.loginregistration.Entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByCourseId(Long courseId);
    int countByCourseId(Long courseId);
    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);
}
