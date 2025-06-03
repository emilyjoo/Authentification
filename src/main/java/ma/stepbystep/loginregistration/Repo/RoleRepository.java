package ma.stepbystep.loginregistration.Repo;

import ma.stepbystep.loginregistration.Entity.Role;
import ma.stepbystep.loginregistration.Entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(RoleName roleName);
}
