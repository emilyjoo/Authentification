package ma.stepbystep.loginregistration.Service.Impl;

import ma.stepbystep.loginregistration.exception.UserNotFoundException;
import ma.stepbystep.loginregistration.exception.DuplicateEmailException;

import ma.stepbystep.loginregistration.Entity.AppUser;
import ma.stepbystep.loginregistration.Service.AppUserService;
import ma.stepbystep.loginregistration.Repo.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppUserServiceImpl implements AppUserService, UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public AppUser createUser(AppUser user) {
        return null;
    }

    @Override
    public AppUser updateUser(Long id, AppUser user) {
        return null;
    }

    @Override
    public void deleteUser(Long id) {

    }

    @Override
    public Optional<AppUser> findByEmail(String email) {
        return Optional.empty();
    }

    @Override
    public Optional<AppUser> findByUsername(String username) {
        return Optional.empty();
    }

    @Override
    public List<AppUser> getAllUsers() {
        return List.of();
    }

    @Override
    public AppUser getUserById(Long id) {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new User(appUser.getEmail(), appUser.getPassword(), new ArrayList<>());
    }
}
