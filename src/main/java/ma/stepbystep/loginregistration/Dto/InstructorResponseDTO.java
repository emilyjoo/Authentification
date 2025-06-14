package ma.stepbystep.loginregistration.Dto;

public class InstructorResponseDTO {
    private Long id;
    private String name;
    private String specialization;

    // Default constructor
    public InstructorResponseDTO() {}

    // Full constructor
    public InstructorResponseDTO(Long id, String name, String specialization) {
        this.id = id;
        this.name = name;
        this.specialization = specialization != null ? specialization : "General";
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

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}
