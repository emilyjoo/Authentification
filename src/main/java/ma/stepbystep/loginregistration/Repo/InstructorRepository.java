package ma.stepbystep.loginregistration.Repo;

import ma.stepbystep.loginregistration.Entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    @Query("SELECT DISTINCT i FROM Instructor i JOIN i.courses c WHERE c.id = :courseId")
    List<Instructor> findByCourseId(@Param("courseId") Long courseId);

    boolean existsByEmail(String email);
}
