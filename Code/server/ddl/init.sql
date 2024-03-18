CREATE DATABASE IF NOT EXISTS maindb;


USE maindb;


DROP TABLE IF EXISTS savedData;
DROP TABLE IF EXISTS accounts;



CREATE TABLE accounts (

userid VARCHAR(20),
password VARCHAR(20),
accountType VARCHAR(5),
PRIMARY KEY (userid)

);

CREATE TABLE savedData (

userid VARCHAR(20),
query VARCHAR(4096),
FOREIGN KEY (userid) REFERENCES accounts(userid)
);


INSERT INTO accounts(userid,password) VALUES ('test123','pass123');