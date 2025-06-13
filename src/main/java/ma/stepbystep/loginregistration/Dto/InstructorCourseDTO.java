package ma.stepbystep.loginregistration.Dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;


public class InstructorCourseDTO {
    private Long id;

    @NotBlank(message = "Course name cannot be blank")
    private String name;

    private String description;
    private String startDate;
    private String endDate;
    private int enrollmentCount;
    private String status;

    // Default constructor (required for JPA)
    public InstructorCourseDTO() {}

    // Constructor for JPQL projection - MUST match the query parameters exactly
    public InstructorCourseDTO(Long id, String name, String description,
                               LocalDate startDate, LocalDate endDate, Long enrollmentCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate != null ? startDate.toString() : null;
        this.endDate = endDate != null ? endDate.toString() : null;
        this.enrollmentCount = enrollmentCount != null ? enrollmentCount.intValue() : 0;
        this.status = calculateStatus(startDate, endDate);
    }

    // Alternative constructor with String dates (if needed)
    public InstructorCourseDTO(Long id, String name, String description,
                               String startDate, String endDate, Long enrollmentCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.enrollmentCount = enrollmentCount != null ? enrollmentCount.intValue() : 0;

        // Calculate status from string dates
        try {
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
            this.status = calculateStatus(start, end);
        } catch (Exception e) {
            this.status = "active";
        }
    }

    // Helper method to calculate status
    private String calculateStatus(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            return "active";
        }

        LocalDate today = LocalDate.now();
        if (today.isBefore(startDate)) {
            return "upcoming";
        } else if (today.isAfter(endDate)) {
            return "completed";
        } else {
            return "active";
        }
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
        // Recalculate status when date changes
        try {
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
            LocalDate end = this.endDate != null ? LocalDate.parse(this.endDate) : null;
            this.status = calculateStatus(start, end);
        } catch (Exception e) {
            this.status = "active";
        }
    }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
        // Recalculate status when date changes
        try {
            LocalDate start = this.startDate != null ? LocalDate.parse(this.startDate) : null;
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
            this.status = calculateStatus(start, end);
        } catch (Exception e) {
            this.status = "active";
        }
    }

    public int getEnrollmentCount() { return enrollmentCount; }
    public void setEnrollmentCount(int enrollmentCount) { this.enrollmentCount = enrollmentCount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "InstructorCourseDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", enrollmentCount=" + enrollmentCount +
                ", status='" + status + '\'' +
                '}';
    }
}
