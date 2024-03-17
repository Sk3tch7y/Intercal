
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
        } catch (error) {
            assert.fail(error);
        }
    });

});

