const assert = require("assert");
const describe = require("node:test");
//the file being tested
const stationQuery = require("../Code/server/queries");
let station = "01AD002";

describe("Testing Query Functions", function() {
    annualData = stationQuery.getAnnual(station);
    monthlyData = stationQuery.getMonthly(station);
    dailyData = stationQuery.getDaily(station);
    it("Should return the date of the data entry annually (1927)", function() {
        assert.equal(annualData[1][0][0], 1927);
    });

    it("Should return the month of the first data entry monthly (10)", function() {
        assert.equal(monthlyData[0][0][1], 10);
    });
    it("Should return the day of the first data entry daily", function() {
        
    })
});
