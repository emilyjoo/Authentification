package ma.stepbystep.loginregistration.Service.Impl;


import jakarta.persistence.EntityNotFoundException;
import ma.stepbystep.loginregistration.Entity.Instructor;
import ma.stepbystep.loginregistration.exception.DuplicateEmailException;
import ma.stepbystep.loginregistration.exception.InstructorNotFoundException;
import ma.stepbystep.loginregistration.Repo.InstructorRepository;
import ma.stepbystep.loginregistration.Service.InstructorService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorServiceImpl implements InstructorService {
    private final InstructorRepository instructorRepository;

    public InstructorServiceImpl(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    @Override
    @Transactional
    public Instructor createInstructor(Instructor instructor) {
        if (instructorRepository.existsByEmail(instructor.getEmail())) {
            throw new DuplicateEmailException(instructor.getEmail());
        }
        return instructorRepository.save(instructor);
    }

    @Override
    @Transactional
    public Instructor updateInstructor(Long id, Instructor instructor) {
        Instructor existingInstructor = instructorRepository.findById(id)
                .orElseThrow(() -> new InstructorNotFoundException(id));

        // Check if email is being changed and if new email already exists
        if (!existingInstructor.getEmail().equals(instructor.getEmail()) &&
                instructorRepository.existsByEmail(instructor.getEmail())) {
            throw new DuplicateEmailException(instructor.getEmail());
        }

        existingInstructor.setName(instructor.getName());
        existingInstructor.setEmail(instructor.getEmail());
        existingInstructor.setSpecialization(instructor.getSpecialization());
        return instructorRepository.save(existingInstructor);
    }

    @Override
    @Transactional
    public void deleteInstructor(Long id) {
        if (!instructorRepository.existsById(id)) {
            throw new InstructorNotFoundException(id);
        }
        instructorRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Instructor getInstructorById(Long id) {
        return instructorRepository.findById(id)
                .orElseThrow(() -> new InstructorNotFoundException(id));
    }

    @Override
    public boolean instructorExistsByUserId(Long userId) {
        return instructorRepository.existsByUser_Id(userId);
    }

    @Override
    public Instructor getInstructorByUserId(Long userId) {
        try {
            Optional<Instructor> instructor = instructorRepository.findByUserId(userId);
            if (instructor.isPresent()) {
                System.out.println("Found instructor by user ID " + userId + ": " + instructor.get().getName());
                return instructor.get();
            } else {
                System.out.println("No instructor found for user ID: " + userId);
                return null;
            }
        } catch (Exception e) {
            System.err.println("Error finding instructor by user ID " + userId + ": " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public Instructor findByUserId(Long userId) {
        return instructorRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found"));
    }
}
