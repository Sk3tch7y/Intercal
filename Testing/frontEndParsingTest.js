const assert = require("assert");
const describe = require("node:test");
//the file being tested
const parse = require("../Code/intercal/src/parseData.jsx");
//Test Cases are taken as sample output from Code/intercal/server/exampleQuery.js
const testDailyData = 
[
  [
    [ 1926, 10, 1, 108 ],
    [ 1926, 10, 2, 85.5 ],
    [ 1926, 10, 3, 73.5999984741211 ],
    [ 1926, 10, 4, 66.5 ],
    [ 1926, 10, 5, 73.5999984741211 ],
  ],
[]
];

const testMonthlyData =
[
  [
    [ 1926, 10, 159 ],
    [ 1926, 11, 375 ],
    [ 1926, 12, 165 ],
    [ 1927, 1, 61.900001525878906 ],
    [ 1927, 2, 33.900001525878906 ],
    [ 1927, 3, 54.29999923706055 ]
  ]
];

const testAnnualData =
[
  [],
  [
    [ 1927, 1880, 28 ],
    [ 1928, 2550, 45 ],
    [ 1929, 2210, 37.70000076293945 ],
    [ 1930, 2730, 42.5 ],
    [ 1931, 1370, 27.5 ],
    [ 1932, 1940, 45.29999923706055 ],
    [ 1933, 3310, 26.600000381469727 ],
  ]
];

describe("Testing front end data parsing", function() {
    it("Should parse daily data and return an object for the front end", function() {
        let parseData = parse.parseDailyData(testDailyData);
        let isEqual = true;
        //isEqual = isEqual && (JSON.stringify(parseData.startDate) === JSON.stringify([1926, 'Oct', 1]));
        //isEqual = isEqual && (JSON.stringify(parseData.endDate) === JSON.stringify([1926, 'Oct', 5]));
        isEqual = isEqual && (JSON.stringify(parseData.dates) === JSON.stringify(["1926-Oct-1","1926-Oct-2","1926-Oct-3","1926-Oct-4","1926-Oct-5"]));
        isEqual = isEqual && (parseData.frequency === 'Daily');
        isEqual = isEqual && (JSON.stringify(parseData.data) === JSON.stringify([108, 85.5, 73.5999984741211, 66.5, 73.5999984741211]));
        assert.equal(isEqual, true);
    });
    it("Should parse Monthly data and return an object for the front end", function() {
        let parseData = parse.parseMonthlyData(testMonthlyData);
        let isEqual = true;
        //isEqual = isEqual && (JSON.stringify(parseData.startDate) === JSON.stringify([1926, 'Oct']));
        //isEqual = isEqual && (JSON.stringify(parseData.endDate) === JSON.stringify([1927, 'Mar']));
        isEqual = isEqual && (JSON.stringify(parseData.dates) === JSON.stringify(["1926-Oct","1926-Nov","1926-Dec","1927-Jan","1927-Feb","1927-Mar"]));
        isEqual = isEqual && (parseData.frequency === 'Monthly');
        isEqual = isEqual && (JSON.stringify(parseData.data) === JSON.stringify([159,375,165,61.900001525878906,33.900001525878906,54.29999923706055]));
        assert.equal(isEqual, true);
    });
    it("Should parse annual max data and return an object for the front end", function() {
        let parseData = parse.parseAnnualMaxData(testAnnualData);
        let isEqual = true;
        //isEqual = isEqual && (parseData.startDate === 1927);
        //isEqual = isEqual && (parseData.endDate === 1933);
        isEqual = isEqual && (JSON.stringify(parseData.dates) === JSON.stringify(["1927","1928","1929","1930","1931","1932","1933"]));
        isEqual = isEqual && (parseData.frequency === 'Annual Maximum');
        isEqual = isEqual && (JSON.stringify(parseData.data) === JSON.stringify([1880,2550,2210,2730,1370,1940,3310]));
        assert.equal(isEqual, true);
    });
    it("Should parse annual min data and return an object for the front end", function() {
        let parseData = parse.parseAnnualMinData(testAnnualData);
        let isEqual = true;
        //isEqual = isEqual && (parseData.startDate === 1927);
        //isEqual = isEqual && (parseData.endDate === 1933);
        isEqual = isEqual && (JSON.stringify(parseData.dates) === JSON.stringify(["1927","1928","1929","1930","1931","1932","1933"]));
        isEqual = isEqual && (parseData.frequency === 'Annual Minimum');
        isEqual = isEqual && (JSON.stringify(parseData.data) === JSON.stringify([28,45,37.70000076293945,42.5,27.5,45.29999923706055,26.600000381469727]));
        assert.equal(isEqual, true);
    });
});
