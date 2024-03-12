CREATE DATABASE maindb IF NOT EXISTS;
go

USE maindb;
go

CREATE TABLE IF NOT EXISTS accounts (

userid VARCHAR(20),
password VARCHAR(20),
PRIMARY KEY (userid),
FOREIGN KEY (userid) REFERENCES savedData(userid)

);


CREATE TABLE IF NOT EXISTS savedData (

userid VARCHAR(20),
query VARCHAR,

PRIMARY KEY (userid)

);