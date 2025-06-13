package ma.stepbystep.loginregistration.Controller;

import jakarta.validation.Valid;
import ma.stepbystep.loginregistration.Dto.AuthResponse;
import ma.stepbystep.loginregistration.Dto.LoginRequest;
import ma.stepbystep.loginregistration.Dto.RegisterRequest;
import ma.stepbystep.loginregistration.Entity.AppUser;
import ma.stepbystep.loginregistration.Entity.Student;
import ma.stepbystep.loginregistration.Entity.Role;
import ma.stepbystep.loginregistration.Entity.RoleName;
import ma.stepbystep.loginregistration.Repo.RoleRepository;
import ma.stepbystep.loginregistration.Service.Impl.AuthService;
import ma.stepbystep.loginregistration.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8082") // frontend port
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private RoleRepository roleRepository;

    private final StudentService studentService;

    public AuthController(AuthService authService, StudentService studentService) {
        this.authService = authService;
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest registerRequest) {
        try {
            System.out.println("Register request received for email: " + registerRequest.getEmail());
            System.out.println("Role ID: " + registerRequest.getRoleId());
            System.out.println("Role Name: " + registerRequest.getRoleName());

            AppUser user = new AppUser();
            user.setUsername(registerRequest.getUsername());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(registerRequest.getPassword());

            // Handle role assignment - priority to ID if both are provided
            Role selectedRole = null;
            if (registerRequest.getRoleId() != null) {
                selectedRole = roleRepository.findById(registerRequest.getRoleId())
                        .orElseThrow(() -> new RuntimeException("Role not found with ID: " + registerRequest.getRoleId()));
            } else if (registerRequest.getRoleName() != null) {
                selectedRole = roleRepository.findByRoleName(registerRequest.getRoleName())
                        .orElseThrow(() -> new RuntimeException("Role not found with name: " + registerRequest.getRoleName()));
            }

            if (selectedRole != null) {
                user.setRoles(Set.of(selectedRole));
                System.out.println("Assigned role: " + selectedRole.getRoleName());
            } else {
                System.out.println("No role specified, defaulting to USER");
                Role defaultRole = roleRepository.findByRoleName(RoleName.valueOf("USER"))
                        .orElseThrow(() -> new RuntimeException("Default USER role not found"));
                user.setRoles(Set.of(defaultRole));
            }

            AuthResponse response = authService.register(user);

            // Check if user has USER role and create student record
            if (response.isSuccess() && hasUserRole(user)) {
                createStudentRecord(user);
            }

            return response.isSuccess() ?
                    ResponseEntity.ok(response) :
                    ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            System.err.println("Registration controller error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(false, "Registration error: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        try {
            System.out.println("Login request for email: " + request.getEmail());
            AuthResponse response = authService.login(request);
            System.out.println("Login response success: " + response.isSuccess());

            return response.isSuccess() ?
                    ResponseEntity.ok(response) :
                    ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            System.err.println("Login error for email " + request.getEmail() + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(false, "Login error: " + e.getMessage()));
        }
    }

    /**
     * Check if user has USER role - works with both String and Enum based Role entities
     */
    private boolean hasUserRole(AppUser user) {
        Set<Role> roles = user.getRoles();
        if (roles == null) return false;

        return roles.stream().anyMatch(role -> {
            // Check if role has RoleName enum
            if (role.getRoleName() instanceof RoleName) {
                return RoleName.USER.equals(role.getRoleName());
            }
            // Handle case where getRoleName() returns the enum name as string
            else {
                String roleNameStr = role.getRoleName().toString();
                return RoleName.USER.name().equals(roleNameStr) ||
                        "USER".equalsIgnoreCase(roleNameStr);
            }
        });
    }

    /**
     * Check if user has INSTRUCTOR role - works with both String and Enum based Role entities
     */
    private boolean hasInstructorRole(AppUser user) {
        Set<Role> roles = user.getRoles();
        if (roles == null) return false;

        return roles.stream().anyMatch(role -> {
            // Check if role has RoleName enum
            if (role.getRoleName() instanceof RoleName) {
                return RoleName.INSTRUCTOR.equals(role.getRoleName());
            }
            // Handle case where getRoleName() returns the enum name as string
            else {
                String roleNameStr = role.getRoleName().toString();
                return RoleName.INSTRUCTOR.name().equals(roleNameStr) ||
                        "INSTRUCTOR".equalsIgnoreCase(roleNameStr);
            }
        });
    }

    /**
     * Create student record for users with USER role
     */
    private void createStudentRecord(AppUser user) {
        try {
            // Check if student already exists for this email
            try {
                studentService.getStudentByEmail(user.getEmail());
                // Student already exists, no need to create
                System.out.println("Student record already exists for email: " + user.getEmail());
                return;
            } catch (RuntimeException e) {
                // Student doesn't exist, create new one
                System.out.println("Creating new student record for email: " + user.getEmail());
            }

            Student student = new Student();
            student.setEmail(user.getEmail());
            student.setName(user.getUsername());
            student.setUser(user);

            Student createdStudent = studentService.createStudent(student);
            System.out.println("Successfully created student record with ID: " + createdStudent.getId());

        } catch (Exception e) {
            // Log the error but don't fail the registration
            System.err.println("Failed to create student record for user: " + user.getEmail() + ". Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}