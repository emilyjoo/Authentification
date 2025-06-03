package ma.stepbystep.loginregistration.Service;

import ma.stepbystep.loginregistration.Entity.AppUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.List;

public interface AppUserService {
    AppUser createUser(AppUser user);
    AppUser updateUser(Long id, AppUser user);
    void deleteUser(Long id);
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findByUsername(String username);
    List<AppUser> getAllUsers();
    AppUser getUserById(Long id);
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
