package ma.stepbystep.loginregistration.Service.Impl;
import ma.stepbystep.loginregistration.Dto.LoginDTO;
import ma.stepbystep.loginregistration.Entity.User;
import ma.stepbystep.loginregistration.Repo.UserRepo;
import ma.stepbystep.loginregistration.Response.LoginMessage;
import ma.stepbystep.loginregistration.Service.UserService;
import ma.stepbystep.loginregistration.Dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class UserImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDTO userDTO) {
        User user = new User(
                userDTO.getUserid(),       // Instance method call
                userDTO.getUsername(),    // Instance method call
                userDTO.getEmail(),       // Instance method call
                this.passwordEncoder.encode(userDTO.getPassword())  // Instance method call
        );
        userRepo.save(user);
        return user.getUsername();
    }
    UserDTO userDTO;

    @Override
    public LoginMessage loginUser(LoginDTO loginDTO) {
        User user1 = userRepo.findByEmail(loginDTO.getEmail());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> employee = userRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (employee.isPresent()) {
                    return new LoginMessage("Login Success", true);
                } else {
                    return new LoginMessage("Login Failed", false);
                }
            } else {
                return new LoginMessage("password Not Match", false);
            }
        }else {
            return new LoginMessage("Email not exits", false);
        }
    }
}


