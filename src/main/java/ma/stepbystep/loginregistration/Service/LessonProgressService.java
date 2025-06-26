package ma.stepbystep.loginregistration.Service;

import ma.stepbystep.loginregistration.Entity.LessonProgress;

import java.util.List;

public interface LessonProgressService {
    public List<LessonProgress> getProgress(Long studentId, Long courseId);
    public void markCompleted(Long studentId, Long lessonId);
    public List<LessonProgress> getAll() ;
    public LessonProgress getById(Long id);
    public LessonProgress create(LessonProgress progress);
    public LessonProgress update(Long id, LessonProgress updated);
    public void delete(Long id);
}
