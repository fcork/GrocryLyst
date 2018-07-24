DROP DATABASE IF EXISTS groceries;

CREATE DATABASE groceries;

USE groceries;

CREATE TABLE groceryItems (
  id int NOT NULL AUTO_INCREMENT,
  food varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
