-- This SQL script sets up the database for the leaderboard application.
-- Create the database
CREATE DATABASE IF NOT EXISTS leaderboard_db;
USE leaderboard_db;

-- ------------------------------------------------------------
-- Leaderboard table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leaderboard (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    score      INT          NOT NULL,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO leaderboard (name, score) VALUES
('Vini', 9800),
('Cris', 7500),
('Julian2', 6200),
('Vi', 4100),
('Nick', 3300);

-- ------------------------------------------------------------
-- Contacts table  (saved from the Contact page form)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    message    TEXT         NOT NULL,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Counter table  (single global counter, starts at 0)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS counter (
    id    INT PRIMARY KEY DEFAULT 1,
    count INT NOT NULL    DEFAULT 0
);

INSERT INTO counter (id, count) VALUES (1, 0);
