package ma.stepbystep.loginregistration.Dto;

import java.time.LocalDate;

public class StudentDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDate enrollmentDate;

    public StudentDTO() {
    }

    public StudentDTO(Long id, String name, String email, LocalDate enrollmentDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.enrollmentDate = enrollmentDate;
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDate getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(LocalDate enrollmentDate) { this.enrollmentDate = enrollmentDate; }
}
