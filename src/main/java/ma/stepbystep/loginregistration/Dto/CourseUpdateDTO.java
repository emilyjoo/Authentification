package ma.stepbystep.loginregistration.Dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CourseUpdateDTO {
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer maxStudents;
    private Double price;
    private String category;

    public CourseUpdateDTO() {
    }

    public CourseUpdateDTO(String name, String description, LocalDate startDate, LocalDate endDate, Integer maxStudents, Double price, String category) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.maxStudents = maxStudents;
        this.price = price;
        this.category = category;
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
}
