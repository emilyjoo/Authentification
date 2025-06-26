package ma.stepbystep.loginregistration.Controller;

import lombok.RequiredArgsConstructor;
import ma.stepbystep.loginregistration.Entity.LessonProgress;
import ma.stepbystep.loginregistration.Service.LessonProgressService;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class LessonProgressController {
    private final LessonProgressService progressService;

    public LessonProgressController(LessonProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public ResponseEntity<List<LessonProgress>> getAll() {
        return ResponseEntity.ok(progressService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonProgress> getById(@PathVariable Long id) {
        return ResponseEntity.ok(progressService.getById(id));
    }

    @PostMapping
    public ResponseEntity<LessonProgress> create(@RequestBody LessonProgress progress) {
        return ResponseEntity.status(HttpStatus.CREATED).body(progressService.create(progress));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LessonProgress> update(@PathVariable Long id, @RequestBody LessonProgress progress) {
        return ResponseEntity.ok(progressService.update(id, progress));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        progressService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> options() {
        return ResponseEntity.ok().allow(HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.OPTIONS).build();
    }

    @GetMapping("/by-student-and-course")
    public ResponseEntity<List<LessonProgress>> getProgress(
            @RequestParam Long studentId,
            @RequestParam Long courseId
    ) {
        return ResponseEntity.ok(progressService.getProgress(studentId, courseId));
    }

    @PostMapping("/complete")
    public ResponseEntity<Void> markCompleted(@RequestParam Long studentId, @RequestParam Long lessonId) {
        progressService.markCompleted(studentId, lessonId);
        return ResponseEntity.ok().build();
    }
}

