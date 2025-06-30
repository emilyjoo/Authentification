package ma.stepbystep.loginregistration.Dto;

import java.time.LocalDate;

public class StudentCourseDTO {
    private Long id;
    private String name;
    private String description;
    private String instructorName;
    private LocalDate enrollmentDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String category;
    private Integer maxStudents;
    private Double price;

    private Long studentId;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    // Default constructor
    public StudentCourseDTO() {}


    // Constructor for JPQL projection - MUST match the query parameters exactly
    public StudentCourseDTO(Long id, String name, String description, String instructorName,
                            LocalDate enrollmentDate, LocalDate startDate, LocalDate endDate,
                            String status, String category, Integer maxStudents, Double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.instructorName = instructorName;
        this.enrollmentDate = enrollmentDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.category = category;
        this.maxStudents = maxStudents;
        this.price = price;
    }


    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getMaxStudents() {
        return maxStudents;
    }

    public void setMaxStudents(Integer maxStudents) {
        this.maxStudents = maxStudents;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
