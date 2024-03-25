require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { get } = require("request");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "cool it works"});
  
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//function to get a connection to the db
//
function getConnection(){
  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  return connection;
}


// Function for validating login
/* 
// Usage:
// Notice the async keyword in the middleware function

//express middleware function for validating a login request
app.use("/login", async function(req, res, next) {
  const username = "test123";
  const password = "pass123";

  try {
      const obj = await validateLogin(username, password);
      req.obj = obj;
      next();
  } catch (error) {
      // Handle error if needed
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

//display the result of the function every get request
app.get('/login', function(req, res) {
  res.json(req.obj);
});

*/
function validateLogin(userId, password) {
  return new Promise((resolve, reject) => {

      //check if username and password are valid (alphanumeric)
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      if(!alphanumericRegex.test(userId) || !alphanumericRegex.test(password)){
        reject("invalid username or password.");
      }

      //establish connection to the database
      const con = getConnection();

      //connect to the database, reject if error
      con.connect((err) => {
        if(err){
          reject(err);
        }
      });

      //query to check if the userid and password match
      con.query(`SELECT userid FROM accounts WHERE userid = ? AND password = ?`, [userId, password], (err, rows, fields) => {
          if (err) {
              //reject the promise if there's an error
              con.end(); //close the connection
              reject(err);
              return;
          }

          //close the connection
          con.end();

          //build the JSON object to be returned
          var message = "Success.";
          const isValid = rows.length > 0;
          if(!isValid){
            userId = null;
            message = "Invalid credentials."
          }
          const result = { isValid, userId, message};
          
          // Resolve the promise with the result
          resolve(result);
      });
  });
}


//Function for validating user creation
//Note: This is not the function that creates the account.
//      It justs ensures the given info can be made into an account.
//Returns: a JSON object with{overallStatus,userIdStatus,passwordStatus}
function validateAccountCreation(userId,password) {
  return new Promise((resolve,reject) => {
    
    //initialize varibles for JSON return object
    overallStatus = "Valid";
    userIdStatus = "Valid";
    passwordStatus = "Valid";

    //check if username and password are valid (alphanumeric)
    //
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if(!alphanumericRegex.test(userId)){
      userIdStatus = "Invalid format.";
      overallStatus = "Invalid";
    }
    if(!alphanumericRegex.test(password)){
      passwordStatus = "Invalid format.";
      overallStatus = "Invalid";
    }


    //establish connection to the database
    const con = getConnection();

    // Connect to the database, reject if error
    con.connect((err) => {
      if(err){
        reject(err);
      }
    });

    //query to check if the name already exists
    con.query(`SELECT userid FROM accounts WHERE userid = ?`, [userId], (err, rows, fields) => {
      if (err) {
          // Reject the promise if there's an error
          con.end(); // Close the connection
          reject(err);
          return;
      }

      //close the connection
      con.end();

      //username is already taken
      if(rows.length > 0){
        userIdStatus = "Invalid, username already taken.";
        overallStatus = "Invalid";
      }

      //build the JSON object to be returned
      const result = {overallStatus,userIdStatus,passwordStatus};

      //resolve the promise with the result
      resolve(result); 
  });

  });
}


//Function for creating account
//
function createAccount(userId,password){

  return new Promise((resolve,reject) => {

   //establish connection to the database
   const con = getConnection();

   // Connect to the database, reject if error
   con.connect((err) => {
     if(err){
       reject(err);
     }
   });


   //check for valid id
   const auth = validateAccountCreation(userId,password);
   //if the userId and password is invalid reject the creation
  if(auth.overall != "Valid"){
   reject("Invalid account info.");
  }

//insert the new account
con.query(`INSERT INTO accounts (userid,password) VALUES (?,?)`, [userId,password], (err, rows, fields) => {
  if (err) {
      // Reject the promise if there's an error
      con.end(); // Close the connection
      reject(err);
      return;
  }

  //close the connection
  con.end();

  //build the JSON object to be returned
  const result = {status: 'Success'};

  //resolve the promise with the result
  resolve(result); 
});


  });  
}

//Function for checking if this bookmark already exists
//Note: this does not save the data, this only checks if the data is already bookmarked
function validateSaveData(userId,query){
  return new Promise((resolve, reject) => {

    //variable for JSON return object
    overallStatus = "Valid";
    userIdStatus = "Valid";
    queryStatus = "Valid";

    //check if the username exists
    res = validateAccountCreation(userId,"!@#invalid!@#");
    //the username given does not exist in the database. Update status accordingly.
    if(res.userIdStatus != "Invalid, username already taken."){
      overallStatus = "Invalid";
      userIdStatus = "Invalid. userId does not exist";
    }


    //establish connection to the database
    const con = getConnection();

     // Connect to the database, reject if error
     con.connect((err) => {
      if (err) {
        reject(err);
      }
    });

    //query to see if saveData already exists
    con.query(`SELECT COUNT(userid) FROM savedData WHERE userid = ? AND query = ?`,[userId,query], (err,rows,fields) =>{

      con.end(); // Close the connection

      // Reject the promise if there's an error
      if (err) {
        reject(err);
        return;
      }

      //the saveData already exists
      if(rows.length > 0){
        overallStatus = "Invalid";
        queryStatus = "Invalid. saveData already exists for this user";
      }

      
      //return JSON object with appropriate status
      resolve({overallStatus,userIdStatus,queryStatus});
    });
  });
}

//funtion for "bookmarking" a query.
// - The bookmark is tied to the userId, and saves the query string.
function saveData(userId,query){
  return new Promise((resolve, reject) => {

    //establish connection to the database
    const con = getConnection();

    // Connect to the database, reject if error
    con.connect((err) => {
      if (err) {
        reject(err);
      }
    });


    //validate the saveData, reject if invalid
    res = validateSaveData(userId,query);
    if(res.overallStatus != "Valid"){
      reject(res.overallStatus);
    }

    //insert the new saveData
    con.query(`INSERT INTO saveData(userid,query) VALUES (?,?)`, [userId, query], (err, rows, fields) => {
      //close the connection
      con.end();

      // Reject the promise if there's an error
      if (err) {
        reject(err);
      }

      //build the JSON object to be returned
      const result = { status: 'Success' };

      //resolve the promise with the result
      resolve(result);
    });
  });
}

//Function to get a list of saved data as a JSON list
//
function getSaveData(userId){
  return new Promise((resolve, reject) => {

    //establish connection to the database
    const con = getConnection();

    // Connect to the database, reject if error
    con.connect((err) => {
      if (err) {
        reject(err);
      }
    });

    //get all saved queries
    con.query(`SELECT query FROM saveData WHERE userid = ?`,[userId],(err,rows,fields) => {
      //close the connection
      con.end();

      // Reject the promise if there's an error
      if (err) {
        reject(err);
      }

      //create list of queries
      var list = [];
      for(r in rows){
        list.push(r);
      }

      //return a json array of list
      resolve(JSON.stringify(list));
    });
  });
}


module.exports = {
  getConnection,
  validateLogin,
  validateAccountCreation,
  createAccount,
  validateSaveData,
  saveData,
};
