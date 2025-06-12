package ma.stepbystep.loginregistration.Dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import ma.stepbystep.loginregistration.Entity.Course;
import ma.stepbystep.loginregistration.Entity.User;

import java.util.Set;

public class InstructorDTO {
    @NotNull
    private Long Id;
    @NotBlank
    private String name;
    @NotBlank
    private String specialization;
    @NotBlank
    private String email;
    @NotNull
    private Long userId;

    public InstructorDTO() {
    }

    public InstructorDTO(Long id, String name, String specialization, String email, Long userId) {
        Id = id;
        this.name = name;
        this.specialization = specialization;
        this.email = email;
        this.userId = userId;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
