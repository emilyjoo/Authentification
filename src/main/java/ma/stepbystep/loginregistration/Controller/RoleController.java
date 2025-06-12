// Create RoleController.java
package ma.stepbystep.loginregistration.Controller;

import ma.stepbystep.loginregistration.Entity.Role;
import ma.stepbystep.loginregistration.Repo.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:8082")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        try {
            List<Role> roles = roleRepository.findAll();
            System.out.println("Returning roles: " + roles);
            return ResponseEntity.ok(roles);
        } catch (Exception e) {
            System.err.println("Error fetching roles: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}