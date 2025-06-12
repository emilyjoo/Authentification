package ma.stepbystep.loginregistration.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class CourseDTO {
    @NotNull
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private LocalDate startDate;
    @NotBlank
    private LocalDate endDate;
    @NotBlank
    private Integer maxStudents;
    @NotBlank
    private Double price;
    @NotBlank
    private String category;
    @NotNull
    private Long instructorId;

    private InstructorDTO instructor;

    public CourseDTO() {
    }

    public CourseDTO(String name, String description, LocalDate startDate, LocalDate endDate, Integer maxStudents, Double price, String category, Long instructorId) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.maxStudents = maxStudents;
        this.price = price;
        this.category = category;
        this.instructorId = instructorId;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Long getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(Long instructorId) {
        this.instructorId = instructorId;
    }

    public InstructorDTO getInstructor() {
        return instructor;
    }
    public void setInstructor(InstructorDTO instructor) {
        this.instructor = instructor;
    }
}
