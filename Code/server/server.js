require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { get } = require("request");
const stations = require('./queries');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {

  const body = req.body;
  res.json({ message: "cool it works"});
  res.send(body);
  
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

stations.makeStationList();

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
 
// Usage:
// Notice the async keyword in the middleware function


/*
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
  console.log("Creating account for: " + userId);
  return new Promise(async (resolve,reject) => {

   //establish connection to the database
   const con = getConnection();

   // Connect to the database, reject if error
   con.connect((err) => {
     if(err){
       reject(err);
     }
   });
   //check for valid id
   const auth = await validateAccountCreation(userId,password);
   //if the userId and password is invalid reject the creation
    if(auth.overallStatus != "Valid"){
      const result =  auth;
      resolve(result);
      return;
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
  return new Promise(async (resolve, reject) => {

    //variable for JSON return object
    overall = "Valid";
    isUserIdValid = "Valid";
    queryStatus = "Valid";

    //check if the username exists
    res = await validateAccountCreation(userId,"!@#invalid!@#");
    //the username given does not exist in the database. Update status accordingly.
    if(res.userIdStatus != "Invalid, username already taken."){
      overall = "Invalid";
      isUserIdValid = "Invalid. userId does not exist";
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
    con.query(`SELECT userid FROM savedData WHERE userid = ? AND query = ?`,[userId,query], (err,rows,fields) =>{

      con.end(); // Close the connection

      // Reject the promise if there's an error
      if (err) {
        reject(err);
        return;
      }

      //the saveData already exists
      if(rows.length > 0){
        overall = "Invalid";
        queryStatus = "Invalid. savedData already exists for this user";
      }

      
      //return JSON object with appropriate status
      resolve({overall,isUserIdValid,queryStatus});
    });
  });
}

//funtion for "bookmarking" a query.
// - The bookmark is tied to the userId, and saves the query string.
function saveData(userId,query){
  return new Promise(async (resolve, reject) => {

    //establish connection to the database
    const con = getConnection();

    // Connect to the database, reject if error
    con.connect((err) => {
      if (err) {
        reject(err);
      }
    });


    //validate the saveData, reject if invalid
    res = await validateSaveData(userId,query);
    if(res.overall != "Valid"){
      reject(res.overall);
    }

    //insert the new saveData
    con.query(`INSERT INTO savedData(userid,query) VALUES (?,?)`, [userId, query], (err, rows, fields) => {
      //close the connection
      con.end();

      // Reject the promise if there's an error
      if (err) {
        reject(err);
      }

      //build the JSON object to be returned
      const result = {status: 'Success' };

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
    con.query(`SELECT query FROM savedData WHERE userid = ?`,[userId],(err,rows,fields) => {
      //close the connection
      con.end();

      // Reject the promise if there's an error
      if (err) {
        reject(err);
      }

      //create list of queries
      let list = [];
      rows.forEach(row => {
        list.push(row.query);
      });
      

      //return a json array of list
      resolve(JSON.stringify(list));
    });
  });
}


//Function for checking if the user is an admin
// 
function isAdmin(userId) {
  return new Promise((resolve, reject) => {


    //establish connection to the database
    const con = getConnection();

    // Connect to the database, reject if error
    con.connect((err) => {
      if (err) {
        reject(err);
      }
    });

    //check if user is admin
    con.query(`SELECT accountType FROM accounts WHERE userid = ?`, [userId], (err, rows, fields) => {
      //close the connection
      con.end();

      // Reject the promise if there's an error
      if (err) {
        reject(err);
      }

      //return true or false depending on if the user is an admin
      resolve((rows[0].accountType == "admin"));

    });

  });
}


//Function to create an alert
//must be an 'admin' account type
function createAlert(userId,query,notes = "None") {
  return new Promise((resolve, reject) => {

    //check if userId is an admin account, reject creation if not admin
    if(!isAdmin(userId)){
      reject("User must be an admin to create alerts.");
    }

    //establish connection to the database
    const con = getConnection();

    // Connect to the database, reject if error
    con.connect((err) => {
      if (err) {
        reject(err);
      }
    });

    //create the alert 
    //returns a JSON object indicating success
    con.query(`INSERT INTO alerts (query,notes) VALUES(?,?)`,[query,notes],(err,rows,fields) => {
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

//Function to get all alerts
//returns as a JSON list
//TODO: implement testing
function getAlerts(){
  return new Promise((resolve,reject) => {
    //establish connection to the database
    const con = getConnection();

    //Connect to the database, reject if error
    con.connect((err) => {
      if (err) {
        reject(err);
      }
    });

    //get alerts and return them as a JSON list
    con.query(`SELECT * FROM alerts`,(err,rows,fields) => {
       //close the connection
       con.end();

       // Reject the promise if there's an error
       if (err) {
         reject(err);
       }
 
       //create list of alerts
       var list = [];
       rows.forEach(row => {
        list.push(row);
      });
 
       //return a json array of list
       resolve(JSON.stringify(list));
    });
  });
}

//app functions
app.post('/createAccount', async (req, res) => {
  const { username, password } = req.body;
  try {
    const auth = await createAccount(username, password);
    res.json(auth);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//express middleware function for validating a login request
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request received for user: " + username);
  try {

      const obj = await validateLogin(username, password);
      res.json(obj);
  } catch (error) {
      // Handle error if needed
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

module.exports = {
  getConnection,
  validateLogin,
  validateAccountCreation,
  createAccount,
  validateSaveData,
  saveData,
  getSaveData,
  createAlert,
  getAlerts,
  isAdmin,
};
