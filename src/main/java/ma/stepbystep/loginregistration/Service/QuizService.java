package ma.stepbystep.loginregistration.Service;

import ma.stepbystep.loginregistration.Entity.Quiz;

import java.util.List;
import java.util.Map;

public interface QuizService {
    public Quiz getQuizByCourseId(Long courseId);
    public int submitQuiz(Long quizId, Map<Long, String> answers);
    public List<Quiz> getAll();
    public Quiz getById(Long id) ;
    public Quiz create(Quiz quiz) ;
    public Quiz update(Long id, Quiz updated) ;
    public void delete(Long id) ;
}
