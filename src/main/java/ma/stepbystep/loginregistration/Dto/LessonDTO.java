package ma.stepbystep.loginregistration.Dto;

import lombok.Data;

@Data
public class LessonDTO {
    private Long id;
    private String title;
    private String contentUrl;
    private boolean completed;
}
