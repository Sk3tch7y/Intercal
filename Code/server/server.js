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

/*
//Function for validating login
// Usage:
// Notice the async keyword in the middleware function

//express function for validating a login request
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

      //TODO: check if username and password are valid (alphanumeric)


      // Establish connection to the database
      const con = mysql.createConnection({
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
      });

      // Connect to the database
      con.connect();

      // Query to check if the userid and password match
      con.query('SELECT userid FROM accounts WHERE userid = ? AND password = ?', [userId, password], (err, rows, fields) => {
          if (err) {
              // Reject the promise if there's an error
              con.end(); // Close the connection
              reject(err);
              return;
          }

          // Close the connection
          con.end();

          // Process the result
          const isValid = rows.length > 0;
          if(!isValid){
            userId = null;
          }
          const result = { isValid, userId };
          
          // Resolve the promise with the result
          resolve(result);
      });
  });
}

console.log(process.env.DB_HOST);

module.exports = {
  app,
  getConnection,
  validateLogin,
};
