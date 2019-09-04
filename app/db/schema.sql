drop database if exists socket_db;

create database socket_db;
use socket_db;

CREATE TABLE users (
  id int AUTO_INCREMENT,
  user_name varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  logged_in boolean default false,
  PRIMARY KEY(id)
);

-- Insert a set of records.
INSERT INTO users (user_name, password, logged_in) VALUES ("Amber", "password", false);

select * from users;

create table messages (
id int AUTO_INCREMENT,
message text NOT NULL,
PRIMARY KEY (id)
);
