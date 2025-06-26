package ma.stepbystep.loginregistration.Service.Impl;

import lombok.RequiredArgsConstructor;
import ma.stepbystep.loginregistration.Entity.Lesson;
import ma.stepbystep.loginregistration.Repo.LessonRepository;
import ma.stepbystep.loginregistration.Service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonServiceImp implements LessonService {
        private final LessonRepository lessonRepo;

        @Autowired
        public LessonServiceImp(LessonRepository lessonRepo) {
            this.lessonRepo = lessonRepo;
        }

        @Override
        public List<Lesson> getLessonsByCourseId(Long courseId) {
            return lessonRepo.findByCourseIdOrderByLessonOrderAsc(courseId);
        }

    @Override
    public List<Lesson> getAll() { return lessonRepo.findAll(); }

    @Override
    public Lesson getById(Long id) { return lessonRepo.findById(id).orElseThrow(); }

    @Override
    public Lesson create(Lesson lesson) { return lessonRepo.save(lesson); }

    @Override
    public Lesson update(Long id, Lesson updated) {
        Lesson l = getById(id);
        l.setTitle(updated.getTitle());
        l.setContentUrl(updated.getContentUrl());
        l.setLessonOrder(updated.getLessonOrder());
        return lessonRepo.save(l);
    }

    @Override
    public void delete(Long id) { lessonRepo.deleteById(id); }


}
