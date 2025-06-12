package ma.stepbystep.loginregistration.Dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EnrollmentDTO {
    private Long studentId;  // Just send IDs instead of full objects
    private Long courseId;
    private LocalDate enrollmentDate;

    public EnrollmentDTO() {
    }
    public EnrollmentDTO(Long studentId, Long courseId, LocalDate enrollmentDate) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.enrollmentDate = enrollmentDate;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }
}
