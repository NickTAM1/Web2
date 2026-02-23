-- Create the database
CREATE DATABASE IF NOT EXISTS leaderboard_db;
USE leaderboard_db;

-- Create the leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO leaderboard (name, score) VALUES
('Player1', 100),
('Player2', 200),
('Player3', 150);