package ma.stepbystep.loginregistration.Service;

import ma.stepbystep.loginregistration.Entity.Lesson;

import java.util.List;

public interface LessonService {
    public List<Lesson> getLessonsByCourseId(Long courseId);
    public List<Lesson> getAll();
    public Lesson getById(Long id);
    public Lesson create(Lesson lesson);
    public Lesson update(Long id, Lesson updated);
    public void delete(Long id);
    public List<Lesson> getLessonsByInstructorId(Long instructorId);
}
