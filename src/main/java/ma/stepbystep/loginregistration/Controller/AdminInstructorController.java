package ma.stepbystep.loginregistration.Controller;

import ma.stepbystep.loginregistration.Entity.Instructor;
import ma.stepbystep.loginregistration.Repo.AppUserRepository;
import ma.stepbystep.loginregistration.Entity.AppUser;
import ma.stepbystep.loginregistration.Service.InstructorService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ma.stepbystep.loginregistration.Dto.InstructorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin/instructors")
@PreAuthorize("hasRole('ADMIN')")
public class AdminInstructorController {

    private final InstructorService instructorService;
    private final AppUserRepository userRepo;

    public AdminInstructorController(InstructorService instructorService,
                                     AppUserRepository userRepo) {
        this.instructorService = instructorService;
        this.userRepo = userRepo;
    }

    @PostMapping
    public ResponseEntity<?> createInstructor(@RequestBody @Valid InstructorDTO dto) {
        AppUser user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // ensure user isn’t already an instructor
        if (instructorService.instructorExistsByUserId(user.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already an instructor");
        }

        Instructor inst = new Instructor();
        inst.setUser(user);
        Instructor saved = instructorService.createInstructor(inst);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

