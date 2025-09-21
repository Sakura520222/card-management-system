-- Create database if not exists
CREATE DATABASE IF NOT EXISTS cardkey_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE cardkey_db;

-- Source the schema file to create tables
SOURCE /docker-entrypoint-initdb.d/schema.sql;
