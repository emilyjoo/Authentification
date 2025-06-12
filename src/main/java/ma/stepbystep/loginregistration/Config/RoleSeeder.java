package ma.stepbystep.loginregistration.Config;

import jakarta.transaction.Transactional;
import ma.stepbystep.loginregistration.Entity.Role;
import ma.stepbystep.loginregistration.Entity.RoleName;
import ma.stepbystep.loginregistration.Repo.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.EnumSet;

@Configuration
public class RoleSeeder {

    @Bean
    @Transactional
    public CommandLineRunner seedRoles(RoleRepository roleRepository) {
        return args -> {
            EnumSet.allOf(RoleName.class).forEach(roleName -> {
                roleRepository.findByRoleName(roleName).orElseGet(() -> {
                    Role role = new Role();
                    role.setRoleName(roleName);
                    return roleRepository.save(role);
                });
            });
        };
    }
}
