const assert = require("assert");
const describe = require("node:test");
const fs = require('node:fs');
//the file being tested
const stationQuery = require("../Code/server/queries");
let station = "01AD002";

describe("Testing Query Functions", function() {
    it("Should return 'No matches'", async function() {
        let noData = await stationQuery.getAnnual("Intercal");
        assert.equal(noData, "No matches");
    })
    it("Should return a list of stations", async function() {
        let stationList = await stationQuery.getStations();
        assert.equal(stationList.type, "FeatureCollection");
    });

    it("Should return the date of the data entry annually (1927)", async function() {
        let annualData = await stationQuery.getAnnual(station);
        assert.equal(annualData[1][0][0], 1927);
    });

    it("Should return the month of the first data entry monthly (10)", async function() {
        let monthlyData = await stationQuery.getMonthly(station);
        assert.equal(monthlyData[0][0][1], 10);
    });
    it("Should return the day of the first data entry daily (1)", async function() {
        let dailyData = await stationQuery.getDaily(station);
        assert.equal(dailyData[0][0][2], 1);
    })
});

describe("Testing json file creation", function() {
    fs.unlink('../server/stations.json', err => {
        if(err) {
            console.error(err);
        }
        else {
            console.log("stations.json removed");
        }
    });
    it("Should create a file called stations.json", async function() {
        let bool = await stationQuery.makeStationList();
        await assert.equal(bool, true);
    })
});
