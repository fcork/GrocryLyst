DROP DATABASE IF EXISTS groceries;

CREATE DATABASE groceries;

USE groceries;

CREATE TABLE groceryItems (
  id int NOT NULL AUTO_INCREMENT,
  food varchar(50) NOT NULL,
  list_id int,
  PRIMARY KEY (ID)
);

CREATE TABLE groceryLists (
  id int NOT NULL AUTO_INCREMENT,
  list VARCHAR(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  fullName VARCHAR(50),
  email VARCHAR(50),
  userName VARCHAR(50),
  list_id int,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
