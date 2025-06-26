package ma.stepbystep.loginregistration.Controller;

import lombok.RequiredArgsConstructor;
import ma.stepbystep.loginregistration.Entity.Quiz;
import ma.stepbystep.loginregistration.Service.QuizService;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAll() {
        return ResponseEntity.ok(quizService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Quiz> create(@RequestBody Quiz quiz) {
        Quiz savedQuiz = quizService.create(quiz);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuiz);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> update(@PathVariable Long id, @RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.update(id, quiz));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        quizService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> options() {
        return ResponseEntity.ok().allow(HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.OPTIONS).build();
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable Long courseId) {
        return ResponseEntity.ok(quizService.getQuizByCourseId(courseId));
    }

    @PostMapping("/{quizId}/submit")
    public ResponseEntity<Map<String, Object>> submitQuiz(
            @PathVariable Long quizId,
            @RequestBody Map<Long, String> answers
    ) {
        int score = quizService.submitQuiz(quizId, answers);
        Map<String, Object> result = new HashMap<>();
        result.put("score", score);
        result.put("total", answers.size());
        return ResponseEntity.ok(result);
    }
}

