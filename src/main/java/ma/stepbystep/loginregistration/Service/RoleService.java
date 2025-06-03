package ma.stepbystep.loginregistration.Service;

import ma.stepbystep.loginregistration.Entity.Role;
import ma.stepbystep.loginregistration.Entity.RoleName;

import java.util.Optional;
import java.util.List;

public interface RoleService {
    Role createRole(Role role);
    Role updateRole(Long id, Role role);
    void deleteRole(Long id);
    Optional<Role> findByRoleName(RoleName roleName);
    List<Role> getAllRoles();
}
