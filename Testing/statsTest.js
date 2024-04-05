const assert = require("assert");
const describe = require("node:test");
//the file being tested
const statsCalcs = require("../Code/intercal/src/stats.jsx");
//Test Case
const testArray = [5, 6, 7, 8, 5, 6, 1, 10];
const endPoint1 = 7;
const endPoint2 = 9;

describe("Testing Statistics Functions", function() {
    it("Should return a length 5 array containg the five Number summary of a numeric array", function() {
        let fiveNumSum = statsCalcs.fiveNumSummary(testArray);
        assert.equal(fiveNumSum[0], 1);
        assert.equal(fiveNumSum[1], 5);
        assert.equal(fiveNumSum[2], 6);
        assert.equal(fiveNumSum[3], 7.5);
        assert.equal(fiveNumSum[4], 10);
    });
    it("Should return the mean (average) of a numeric array", function() {
        let average = statsCalcs.mean(testArray);
        assert.equal(average, 6);
    });
    it("Should return the variance of a numeric array", function() {
        let variance = statsCalcs.variance(testArray);
        correctValue = 6.8571;
        let isInRange = (Math.abs(variance - correctValue) < 0.0001);
        assert.equal(isInRange, true);
    });
    it("Should return the standard deviation of a numeric array", function() {
        let standardDeviation = statsCalcs.stdev(testArray);
        let correctValue = 2.6186;
        let isInRange = (Math.abs(standardDeviation - correctValue) < 0.0001);
        assert.equal(isInRange, true);
    });
    it("Should return the probability of a random variable being less than a certain value for a numeric array", function() {
        let prob = statsCalcs.probability(testArray, 0, endPoint1);
        //From using a traditional z-score table
        let lowerBound = 0.6480;
        let upperBound = 0.6517;
        let isInRange = ((lowerBound < prob) && (prob < upperBound));
        assert.equal(isInRange, true);
    });
    it("Should return the probability of a random variable falling in a specified range for a numeric array", function() {
        let prob = statsCalcs.probability(testArray, 1, endPoint1, endPoint2);
        //From using a traditional z-score table
        let lowerBound = 0.2212;
        let upperBound = 0.2269;
        let isInRange = ((lowerBound < prob) && (prob < upperBound));
        assert.equal(isInRange, true);
    });
    it("Should return the probability of a random variable being greater than a certain value for a numeric array", function() {
        let prob = statsCalcs.probability(testArray, 2, endPoint1);
        //From using a traditional z-score table
        let lowerBound = 1 - 0.6517;
        let upperBound = 1 - 0.6480;
        let isInRange = ((lowerBound < prob) && (prob < upperBound));
        assert.equal(isInRange, true);
    });
});
