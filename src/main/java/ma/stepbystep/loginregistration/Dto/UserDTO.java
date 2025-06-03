package ma.stepbystep.loginregistration.Dto;

public class UserDTO {
    private int userid;
    private String username;
    private String email;
    private String password;

    public UserDTO(int userid, String username, String email, String password) {
        this.userid = userid;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public int getUserid() {
        return userid;
    }

    public  String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
