package ma.stepbystep.loginregistration.Service;

import ma.stepbystep.loginregistration.Dto.LoginDTO;
import ma.stepbystep.loginregistration.Dto.UserDTO;
import ma.stepbystep.loginregistration.Response.LoginMessage;

public interface UserService {
    String addUser(UserDTO UserDTO);
    LoginMessage loginUser(LoginDTO loginDTO);
}
