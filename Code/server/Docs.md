# Server-Side Documentation

## Functions for Front-End to Back-End

### validateLogin

This is the function to use for a login page. Username and password must be alphamnumeric.

#### Args

- userId. This is the username you want to login.
- password. This is the password for the user you want to login.

#### Returns

The function returns a JSON with 3 variables

- **isValid**(true/false). Will be true if the login is valid (username and password match with a database entry)
- **userId**(string or null). This is the user id that was passed into the function. If the login is not valid, the value will be null. The idea for this variable is for it to be assigned to a session variable, so that the website can tell who is logged in(null usernames imply the user is not logged in).
- **message**(string). displays either "Success." or "Invalid credentials." depending on the validity of the login. The idea for this variable is to provide information to the user about their login attempt.

### validateAccountCreation

Note: This is not the function that creates the account. It justs ensures the given info can be made into an account. Useful for an account creation page.

A valid account must have a well formatted username and password (alphanumeric), and must have a username that doesnt already exist.

#### Args

- userId. This is the username you want to use.
- password. This is the password for the user you want to use.

#### Returns

A JSON object with 3 variables {overallStatus,userIdStatus,passwordStatus}

- overallStatus(string). Either "Valid" or "Invalid"
- userIdStatus(string). Indicates the validity of the proposed userId. One of "Valid", "Invalid format.", "Invalid, username already taken."
- passwordStatus(string). Either "Valid" or "Invalid format."

### createAccount

With attempt to create an account if it is valid.

#### Args

- userId. This is the username you want to use.
- password. This is the password for the user you want to use.

#### Returns

A JSON with 1 variable

- status(string).  "Success". An error will be thrown otherwise.

### validateSaveData

Note: this does not save the data, this only checks if the data is already bookmarked.

Useful for updating a bookmark UI element based on if the search result is saved (you can check if the save data already exists).

Only Users can save data.

#### Args

- userId. The username of the user trying to save data
- query. The query that corresponds to the data

#### Returns

A JSON with 3 variables.

- overall(string). The overall validity of the data Either "Valid" or "Invalid"
- isUserIdValid(string). Either "Valid" or "Invalid. userId does not exist"
- queryStatus(string). Either "Valid" or "Invalid. savedData already exists for this user". (use this for updating a ui element)


### saveData

Bookmarks the search result if it is valid.

#### Args

- userId. The username of the user trying to save data
- query. The query that corresponds to the data

#### Returns

A JSON with 1 variable

- status(string) "Success". An error will be thrown with an informative message if anything goes wrong(i.e. invalid user).

### getSaveData

returns all saveData for a user as a JSON array.

#### Args

- userId. the user whose saved data you want to get

#### Returns

A JSON array. To use it in javascript, you must parse it:

```js

myArray = json.parse(myJsonResult);

```

### createAlert

A function for admin accounts to create save alerts to a database

#### Args

- userId. the username of the admin account.
- query. the query corresponding to the data you want to make an alert for.
- notes("None." by default) any string you want to add.

#### Returns

A JSON with 1 variable

- status(string) "Success". An error will be thrown with an informative message if anything goes wrong(i.e. User must be an admin to create alerts.)

### getAlerts

returns all alerts as a JSON array.

No arguments.

#### Returns

A JSON array. To use it in javascript, you must parse it:

```js

myArray = json.parse(myJsonResult);

```

## Helper Functions

### getConnection

A function that returns a connection ready to be connected to the database

### isAdmin

A function that returns true or false based on if an account is an admin or not

## Example usage

Replace the **ValidateLogin** function with any of the server functions.

```js

// Function for validating login

// Usage:
// Notice the async keyword in the middleware function

//express middleware function for validating a login request
app.use("/login", async function(req, res, next) {
  const username = "test123";
  const password = "pass123";

  try {
    //put the server function HERE
      const obj = await validateLogin(username, password);
      req.obj = obj;
      next();
  } catch (error) {
      // Handle error if needed
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

//display the result of the function every post request
app.post('/login', function(req, res) {
  res.json(req.obj);
});

```