-- Grant remote access to authuser
GRANT ALL PRIVILEGES ON *.* TO 'authuser'@'%' IDENTIFIED BY 'authpass';
FLUSH PRIVILEGES;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Insert a test user (password is 'password123' encoded with BCrypt)
INSERT INTO users (email, password, first_name, last_name, role)
VALUES (
           'test@example.com',
           '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',
           'Test',
           'User',
           'USER'
       );
