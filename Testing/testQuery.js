const assert = require("assert");
const describe = require("node:test");
//the file being tested
const stationQuery = require("../Code/server/queries");
let station = "01AD002";

describe("Testing Query Functions", function() {
    it("Should return the date of the data entry annually", function() {
        annualData = stationQuery.getAnnual(station);
        assert.equal(annualData[1][0][0], 1927);
    });

    it("Should return no data for the entry monthly", function() {
        monthlyData = stationQuery.getMonthly(station);
        myTest = (monthlyData[0] == 0 && monthlyData[1] == 0);
        assert.equal(myTest, true);
    });
    //it("")
    // To be cont'd
});
