package ma.stepbystep.loginregistration.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String contentUrl; // video link, PDF link, etc.

    private int lessonOrder;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonBackReference(value = "course-lessons")
    private Course course;

    public Lesson() {
    }

    public Lesson(Long id, String title, String contentUrl, int lessonOrder, Course course) {
        this.id = id;
        this.title = title;
        this.contentUrl = contentUrl;
        this.lessonOrder = lessonOrder;
        this.course = course;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }

    public int getLessonOrder() {
        return lessonOrder;
    }

    public void setLessonOrder(int lessonOrder) {
        this.lessonOrder = lessonOrder;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}

