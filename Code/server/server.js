const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

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
  res.json({ message: "cool it works" });
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

//function for validating login
//
function valiateLogin(){

  //check to see if username is valid
  

  
 //establish connection to db
  con = getConnection();

  //check if the user already exists
  

  const query = con.query('SELECT COUNT(userid) FROM accounts WHERE userid = ?', 
  [userId], 
  function(err, results) {
    // Handle results

  }
  );

  
//if the user doesnt exist and is valid, create the account



//return json with relevant info


}


module.exports = {
  getConnection,
};