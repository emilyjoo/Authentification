package ma.stepbystep.loginregistration.Service.Impl;

import lombok.RequiredArgsConstructor;
import ma.stepbystep.loginregistration.Entity.LessonProgress;
import ma.stepbystep.loginregistration.Entity.Student;
import ma.stepbystep.loginregistration.Repo.LessonProgressRepository;
import ma.stepbystep.loginregistration.Repo.LessonRepository;
import ma.stepbystep.loginregistration.Service.LessonProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LessonProgressServiceImp implements LessonProgressService {
    private final LessonProgressRepository progressRepo;
    private final LessonRepository lessonRepo;

    @Autowired
    public LessonProgressServiceImp(LessonProgressRepository progressRepo, LessonRepository lessonRepo) {
        this.progressRepo = progressRepo;
        this.lessonRepo = lessonRepo;
    }



    @Override
    @Transactional(readOnly = true)
    public List<LessonProgress> getAll() { return progressRepo.findAll(); }
    public LessonProgress getById(Long id) { return progressRepo.findById(id).orElseThrow(); }

    @Override
    @Transactional
    public LessonProgress create(LessonProgress progress) { return progressRepo.save(progress); }
    @Override
    @Transactional
    public LessonProgress update(Long id, LessonProgress updated) {
        LessonProgress lp = getById(id);
        lp.setCompleted(updated.isCompleted());
        return progressRepo.save(lp);
    }
    @Override
    @Transactional
    public void delete(Long id) { progressRepo.deleteById(id); }

    @Override
    @Transactional(readOnly = true)
    public List<LessonProgress> getProgress(Long studentId, Long courseId) {
        return progressRepo.findByStudentIdAndLesson_CourseId(studentId, courseId);
    }

    @Override
    public void markCompleted(Long studentId, Long lessonId) {
        LessonProgress progress = progressRepo.findByStudentIdAndLessonId(studentId, lessonId)
                .orElseGet(() -> {
                    LessonProgress lp = new LessonProgress();
                    lp.setStudent(new Student(studentId)); // Use ID constructor or fetch entity
                    lp.setLesson(lessonRepo.findById(lessonId).orElseThrow());
                    return lp;
                });

        progress.setCompleted(true);
        progressRepo.save(progress);
    }
}

