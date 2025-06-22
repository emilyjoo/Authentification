package ma.stepbystep.loginregistration.Config;

import ma.stepbystep.loginregistration.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authenticationProvider(authenticationProvider()) // Add this line
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/roles", "/api/roles/**").permitAll()
                        .requestMatchers("/api/instructors", "/api/instructors/**").permitAll()
                        .requestMatchers("/api/instructors/by-user", "/api/instructors/by-user/**").permitAll()
                        .requestMatchers("/api/users", "/api/users/**").permitAll()
                        .requestMatchers("/api/users/role/**").permitAll()
                        .requestMatchers("/api/courses", "/api/courses/**").permitAll()
                        .requestMatchers("/api/courses/by-instructor", "/api/courses/by-instructor/**").permitAll()
                        .requestMatchers("/api/courses/instructor", "/api/courses/instructor/**").permitAll()
                        .requestMatchers("/api/enrollments", "/api/enrollments/**").permitAll()
                        .requestMatchers("/api/enrollments/student", "/api/enrollments/student/**").permitAll()
                        .requestMatchers("/api/students", "/api/students/**").permitAll()
                        .requestMatchers("/api/modules", "/api/modules/**").permitAll()
                        .requestMatchers("/api/module-progress", "/api/module-progress/**").permitAll()
                        .requestMatchers("/api/students/user", "/api/students/user/**").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}