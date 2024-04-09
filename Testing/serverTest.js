
const assert = require("assert");
const describe = require("node:test")
//the file being tested
const server = require("../Code/server/server");


//IMPORTANT: 

// 1. Make sure docker is running and configured correctly or tests will fail.
//    See the docker setup in README.



describe("Test mysql",function(){
    it("Should be able to receive a valid connection object",function(){
       con = server.getConnection();
        assert.equal((con != null), true);
    });

    it("Should be able to connect to the server using connection object",async function(){
        try{
            con = server.getConnection();
            con.connect();
            con.end();
        } catch(error){
            assert.fail(error);
        }
    });
});

describe("Login tests",function(){
    it("should be able to validate logins, returning a JSON with {isValid,userId}",async function(){
        
        const username = "test123";
        const password = "pass123";
        
        try {
            const obj = await server.validateLogin(username, password);
            assert.equal(obj.isValid, true);
            assert.equal(obj.userId,username);
            assert.equal(obj.message,"Success.");
        } catch (error) {
            assert.fail(error);
        }
    });
    it("should be able to return the correct response if invalid credentials are given",async function(){
        
        const username = "test123";
        const password = "wrongpassword123";
        
        try {
            const obj = await server.validateLogin(username, password);
            assert.equal(obj.isValid, false);
            assert.equal(obj.userId,null);
            assert.equal(obj.message,"Invalid credentials.");
        } catch (error) {
            assert.fail(error);
        }
    });
    it("(V1)should be able to reject the input if the username info is not formatted correctly",async function(){
        
        const username1 = "!@#$%^&*()-+=_";
        const password1 = "validpw";
        
        try {
            const obj = await server.validateLogin(username1, password1);
            assert.fail("An error was expected, but there was none.");
        } catch (error) {
            assert.equal(error,"invalid username or password.");
        }
    });
    it("(V2)should be able to reject the input if the password info is not formatted correctly",async function(){

        const username2 = "validuser";
        const password2 = "=+_-)(*&^%$#@!";
        
        try {
            const obj = await server.validateLogin(username2, password2);
            assert.fail("An error was expected, but there was none.");
        } catch (error) {
            assert.equal(error,"invalid username or password.");
        }
    });

});

describe("validateAccountCreation tests",function(){

    const usernameValid = "validUser123";
    const usernameAlreadyTaken = "test123";
    const usernameInvalidFormat = "=+-_)(*&^%$#@!";

    const passwordValid = "pass123";
    const passwordInvalidFormat = "!@#$%^&*()_-+=";


    it("should be able to validate a new valid account",async function(){
        try {
            const obj = await server.validateAccountCreation(usernameValid,passwordValid);
            assert.equal(obj.overallStatus,"Valid");
            assert.equal(obj.userIdStatus,"Valid");
            assert.equal(obj.passwordStatus,"Valid");
        } catch(error) {
            assert.fail(error);
        }

    });
    it("should be able to invalidate a username already in use",async function(){
        try {
            const obj = await server.validateAccountCreation(usernameAlreadyTaken,passwordValid);
            assert.equal(obj.overallStatus,"Invalid");
            assert.equal(obj.userIdStatus,"Invalid, username already taken.");
            assert.equal(obj.passwordStatus,"Valid");
        } catch(error) {
            assert.fail(error);
        }

    });
    it("should be able to invalidate a username with invalid format",async function(){
        try {
            const obj = await server.validateAccountCreation(usernameInvalidFormat,passwordValid);
            assert.equal(obj.overallStatus,"Invalid");
            assert.equal(obj.userIdStatus,"Invalid format.");
            assert.equal(obj.passwordStatus,"Valid");
        } catch(error) {
            assert.fail(error);
        }

    });
    it("should be able to invalidate a password with invalid format",async function(){
        try {
            const obj = await server.validateAccountCreation(usernameValid,passwordInvalidFormat);
            assert.equal(obj.overallStatus,"Invalid");
            assert.equal(obj.userIdStatus,"Valid");
            assert.equal(obj.passwordStatus,"Invalid format.");
        } catch(error) {
            assert.fail(error);
        }

    });
    it("should be able to invalidate a username that is already taken, and a password with invalid format",async function(){
        try {
            const obj = await server.validateAccountCreation(usernameAlreadyTaken,passwordInvalidFormat);
            assert.equal(obj.overallStatus,"Invalid");
            assert.equal(obj.userIdStatus,"Invalid, username already taken.");
            assert.equal(obj.passwordStatus,"Invalid format.");
        } catch(error) {
            assert.fail(error);
        }
    });


});

describe("createAccount tests",function(){
    usernameAlreadyTaken = "test123";
    usernameInvalidFormat = "!@#$%^&*()_-+=";
    passwordInvalidFormat = "=+-_)(*&^%$#@!";
    username = "newuser123";
    password = "pass123";

    it("Should be able to reject the addition of an incorrectly formatted username",async function(){
        try{
            await server.createAccount(usernameInvalidFormat,password);
        } catch(error) {
            assert.equal(error,"Invalid account info.");
        }
    });
    it("Should be able to reject the addition of an incorrectly formatted password",async function(){
        try{
            await server.createAccount(username,passwordInvalidFormat);
        } catch(error) {
            assert.equal(error,"Invalid account info.");
        }
    });
    it("Should be able to reject the addition of a username already in use",async function(){
        try{
            await server.createAccount(usernameAlreadyTaken,password);
        } catch(error) {
            assert.equal(error,"Invalid account info.");
        }
    });

});

describe("validateSaveData tests",function(){
    const usernameValid = 'test123';
    const usernameInvalid = 'nonexistentuser';
    const postIdAlreadyTaken = '123123';
    const postIdValid = '890890';
    it("Should validate a valid saveData",async function(){
        try{
            result = await server.validateSaveData(usernameValid,postIdValid);
            assert.equal(result.overall,"Valid");
            assert.equal(result.isUserIdValid,"Valid");
            assert.equal(result.postIdStatus,"Valid");
        } catch(error){
            assert.fail(error);
        }
       
    });
    it("Should invalidate a saveData with invalid username",async function(){
        try{
            result = await server.validateSaveData(usernameInvalid,postIdValid);
            assert.equal(result.overall,"Invalid");
            assert.equal(result.isUserIdValid,"Invalid. userId does not exist");
            assert.equal(result.postIdStatus,"Valid");
        } catch(error){
            assert.fail(error);
        }
     });
     it("Should invalidate a saveData that already exists",async function(){
        try{
            result = await server.validateSaveData(usernameValid,postIdAlreadyTaken);
            assert.equal(result.overall,"Invalid");
            assert.equal(result.isUserIdValid,"Valid");
            assert.equal(result.postIdStatus,"Invalid. savedData already exists for this user");
        } catch(error){
            assert.fail(error);
        }
     });
});

describe("saveData tests", function(){
    const usernameValid = 'test123';
    const usernameInvalid = 'nonexistentuser';
    const postIdAlreadyTaken = '123123';
    const postIdValid = '890890';
    it("Should reject a saveData with invalid username",async function(){
        try{
            result = await server.saveData(usernameInvalid,postIdValid);
        } catch(error){
            assert.equal(error,"Invalid");
        }
     });
     it("Should reject a saveData that already exists",async function(){
        try{
            result = await server.saveData(usernameValid,postIdAlreadyTaken);
        } catch(error){
            assert.equal(error,"Invalid");
        }
     });

});

describe("getSaveData tests",function(){
    usernameValid = 'test123';
    usernameInvalid = 'invaliduser123';
    postIdFromUser = '123123'

    it("should return a list of saveData for the corresponding username",async function(){
        result = await server.getSaveData(usernameValid);
        result = JSON.parse(result);
        assert.equal(result[0].postId,postIdFromUser);
    });
});

describe("isAdmin tests",function(){
    usernameNonAdmin = "test123";
    usernameAdmin = 'admin123';
    it("should return false for non-admin accounts",async function(){
        try{
            result = await server.isAdmin(usernameNonAdmin);
            assert.equal(result,false);  
        } catch(error){
            assert.fail(error);
        }
    });
    it("should return true for admin accounts",async function(){
        try{
            result = await server.isAdmin(usernameAdmin);
            assert.equal(result,true);  
        } catch(error){
            assert.fail(error);
        }
    });
});

describe("createAlert tests",function(){
    usernameNonAdmin = "test123";
    it("should reject requests from non-admin accounts",async function(){
        try{
           await server.createAlert(usernameNonAdmin,'1231231');
        } catch(error){
            assert.equal(error,"User must be an admin to create alerts.")
        }
    });
});
