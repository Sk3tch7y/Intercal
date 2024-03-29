CREATE DATABASE IF NOT EXISTS maindb;


USE maindb;


DROP TABLE IF EXISTS savedData;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS alerts;


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


CREATE TABLE alerts (
    alertid INT AUTO_INCREMENT,
    query VARCHAR(4096),
    notes VARCHAR(4096),
    PRIMARY KEY (alertid)
);

INSERT INTO accounts(userid,password) VALUES ('test123','pass123');
INSERT INTO accounts(userid,password,accountType) VALUES ('admin123','pass123','admin');
INSERT INTO savedData(userid,query) VALUES ('test123','testquery'); 