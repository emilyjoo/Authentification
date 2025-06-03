package ma.stepbystep.loginregistration.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.logging.Logger;

@Component
public class JwtTokenProvider {

    private static final Logger logger = Logger.getLogger(JwtTokenProvider.class.getName());

    @Value("${app.jwtSecret:defaultFallbackSecretKey}") // fallback for safety
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs:86400000}") // default: 1 day
    private int jwtExpirationInMs;

    /**
     * Generates a JWT token from an authenticated UserPrincipal.
     */
    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(String.valueOf(userPrincipal.getId())) // subject = userId
                .claim("email", userPrincipal.getEmail())          // optional claim
                .claim("username", userPrincipal.getUsername()) // optional claim
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    /**
     * Generates a token with an email as the subject.
     */
    public String generateTokenWithEmail(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    /**
     * Generates a token using a user ID as subject (used in register method).
     */
    public String generateTokenFromUserId(Long userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    /**
     * Extracts the user ID from the JWT token's subject.
     */
    public Long getUserIdFromJWT(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token)
                    .getBody();
            return Long.parseLong(claims.getSubject());
        } catch (NumberFormatException e) {
            logger.warning("Subject is not a valid userId: " + e.getMessage());
            return null;
        } catch (Exception e) {
            logger.warning("Failed to parse user ID from token: " + e.getMessage());
            return null;
        }
    }

    /**
     * Validates the token structure, expiration, and signature.
     */
    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.warning("Invalid JWT signature: " + ex.getMessage());
        } catch (MalformedJwtException ex) {
            logger.warning("Invalid JWT token: " + ex.getMessage());
        } catch (ExpiredJwtException ex) {
            logger.warning("Expired JWT token: " + ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            logger.warning("Unsupported JWT token: " + ex.getMessage());
        } catch (IllegalArgumentException ex) {
            logger.warning("JWT claims string is empty: " + ex.getMessage());
        }
        return false;
    }
}
