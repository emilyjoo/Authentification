package ma.stepbystep.loginregistration.Controller;

import ma.stepbystep.loginregistration.Entity.Instructor;
import ma.stepbystep.loginregistration.Service.InstructorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@Validated
public class InstructorController {
    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    @PostMapping
    public ResponseEntity<?> createInstructor(@Valid @RequestBody Instructor instructor, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        Instructor savedInstructor = instructorService.createInstructor(instructor);
        return new ResponseEntity<>(savedInstructor, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateInstructor(@PathVariable Long id, @Valid @RequestBody Instructor instructor, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        Instructor updatedInstructor = instructorService.updateInstructor(id, instructor);
        return ResponseEntity.ok(updatedInstructor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        instructorService.deleteInstructor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Instructor>> getAllInstructors() {
        return ResponseEntity.ok(instructorService.getAllInstructors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instructor> getInstructorById(@PathVariable Long id) {
        return ResponseEntity.ok(instructorService.getInstructorById(id));
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Instructor> getInstructorByUserId(@PathVariable Long userId) {
        Instructor instructor = instructorService.findByUserId(userId);
        return ResponseEntity.ok(instructor);
    }


}
