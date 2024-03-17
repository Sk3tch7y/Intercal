
const assert = require("assert");
const describe = require("node:test")
//the file being tested
const server = require("../Code/server/server");


//IMPORTANT: 
// 1. Make sure docker is running or tests will fail
// 2. Make sure ther server side is running or some tests will fail


describe("Test mysql",function(){
    it("Should be able to receive a valid connection object",function(){
       con = server.getConnection();
        assert.equal((con != null), true);
    });

    it("Should be able to connect to the server using connection object",async function(){
        try{
            con = server.getConnection();
            con.connect();
            con.close();
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
        } catch (error) {
            assert.equal(error,"invalid username or password.");
        }
    });
    it("(V2)should be able to reject the input if the password info is not formatted correctly",async function(){

        const username2 = "validuser";
        const password2 = "=+_-)(*&^%$#@!";
        
        try {
            const obj = await server.validateLogin(username2, password2);
        } catch (error) {
            assert.equal(error,"invalid username or password.");
        }
    });

});

