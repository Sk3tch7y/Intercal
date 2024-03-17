
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

    it("Should be able to use a connection to query the database",async function(){
        con = server.getConnection();
        con.connect();
        var [rows] = await con.execute('SELECT * FROM account');
        
        assert.equal(rows[0],1);
    });
});

describe("Login tests",function(){
    it("should be able to validate logins, returning a json with {isValid,userId}",async function(){
        
        
        const username = "test123";
        const password = "pass123";
        
        try {
            const obj = await server.validateLogin(username, password);
            assert.equal(obj.isValid,true);
        } catch (error) {
            assert.fail(error);
        }
        
        assert.fail("no result");
    });

});

