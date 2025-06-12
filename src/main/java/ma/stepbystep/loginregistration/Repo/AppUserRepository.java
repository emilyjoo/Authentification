package ma.stepbystep.loginregistration.Repo;
import ma.stepbystep.loginregistration.Entity.AppUser;
import ma.stepbystep.loginregistration.Entity.RoleName;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);

    Optional<AppUser> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM AppUser u JOIN u.roles r WHERE r.roleName = :roleName")
    List<AppUser> findByRoleName(@Param("roleName") RoleName roleName);


}
