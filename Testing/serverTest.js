
const assert = require("assert");
const describe = require("node:test")
const server = require("../Code/server/server");


//Make sure docker is running or test will fail
describe("Test mysql",function(){
    it("Should be able to receive a valid connection object",function(){
       con = server.getConnection();
       res = false;
       
            con.connect(function(err) {
                if (err){
                    res = false;
                    throw err;
                } else{
                    res = true;
                }
            });
       
        assert.equal(res,true);
      });
});
