package ma.stepbystep.loginregistration.Service.Impl;

import lombok.RequiredArgsConstructor;
import ma.stepbystep.loginregistration.Entity.Question;
import ma.stepbystep.loginregistration.Entity.Quiz;
import ma.stepbystep.loginregistration.Repo.QuestionRepository;
import ma.stepbystep.loginregistration.Repo.QuizRepository;
import ma.stepbystep.loginregistration.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class QuizServiceImp implements QuizService {
    private final QuizRepository quizRepo;
    private final QuestionRepository questionRepo;

    @Autowired
    public QuizServiceImp (QuizRepository quizRepo, QuestionRepository questionRepo) {
        this.quizRepo = quizRepo;
        this.questionRepo = questionRepo;
    }

    @Override
    public List<Quiz> getAll() { return quizRepo.findAll(); }
    @Override
    public Quiz getById(Long id) { return quizRepo.findById(id).orElseThrow(); }
    @Override
    public Quiz create(Quiz quiz) {
        if (quiz.getQuestions() != null) {
            quiz.getQuestions().forEach(question -> question.setQuiz(quiz));
        }
        return quizRepo.save(quiz);
    }
    @Override
    public Quiz update(Long id, Quiz updated) {
        Quiz q = getById(id);
        q.setTitle(updated.getTitle());
        return quizRepo.save(q);
    }
    @Override
    public void delete(Long id) { quizRepo.deleteById(id); }

    @Override
    public Quiz getQuizByCourseId(Long courseId) {
        return quizRepo.findByCourseId(courseId).orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    @Override
    public int submitQuiz(Long quizId, Map<Long, String> answers) {
        List<Question> questions = questionRepo.findByQuizId(quizId);
        int correct = 0;

        for (Question q : questions) {
            String answer = answers.get(q.getId());
            if (q.getCorrectAnswer().equalsIgnoreCase(answer)) {
                correct++;
            }
        }

        return correct;
    }
}

