package ma.stepbystep.loginregistration.Dto;

import lombok.Data;

import java.util.List;

@Data
public class CourseViewerDTO {
    private String name;
    private String description;
    private List<LessonDTO> lessons;
    private int totalLessons;
    private int completedLessons;
    private boolean quizAvailable;
}
