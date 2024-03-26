
//This document contains functions for conducting a statistical analysis of a list of numeric data.

//returns null for empty arrays
export function fiveNumSummary(inputArray) {
   //In the five number summary, the median is central datapoint for arrays of odd
   //length. It is the average of the central two data points for arrrays of even 
   //length. The first quartile (Q1) is the median of a subarray with data points
   //less than the original median. Similarily, the third quartile (Q3) is the 
   //median of a subarray with data points greater than the original median.

   let n = inputArray.length;
   //Start with 2 edge cases
   if (n === 0) {
      return null;
   } else if(n === 1) {
      let x = inputArray[0];
      return [x, x, x, x, x]; //all five numbers are the single data point.
   }

   //We need a sorted array for the five number summary
   let sortedArray = [];
   for(let i = 0; i < n; i++ ) {
    sortedArray[i] = inputArray[i]
   }
   sortedArray.sort(function(a, b){return a - b});

   let min, Q1, median, Q3, max;
   min = sortedArray[0];
   max = sortedArray[n-1];

   //Length of the two subarrays used to calculate Q1 and Q3.
   let subLength;
   //Starting index of the upper subarray, to calculate Q3.
   let startUpper;

   //Find the median of original array.
   if(n%2 === 1) {
      median = sortedArray[(n-1)/2];
      subLength = (n-1)/2;
      startUpper = subLength + 1;
   } else {
      median = (sortedArray[n/2 - 1] + sortedArray[n/2])/2;
      subLength = n/2;
      startUpper = subLength;
   }

   //Calculate Q1 and Q3.
   if(subLength%2 === 1) {
      Q1 = sortedArray[(subLength-1)/2];
      Q3 = sortedArray[startUpper + (subLength-1)/2];
   } else {
      Q1 = (sortedArray[subLength/2 - 1] + sortedArray[subLength/2])/2;
      Q3 = (sortedArray[startUpper + subLength/2 - 1] + sortedArray[startUpper + subLength/2])/2;
   }

return [min, Q1, median, Q3, max];
}

//returns null for empty arrays
function mean(inputArray) {
   let n = inputArray.length;
   if(n === 0) {return null;}
   let sum = 0;
   for(let i = 0; i < n; i++){
      sum += inputArray[i];
   }
   return sum/n;
}

//returns NaN for single element arrays, and null for empty arrays
function variance(inputArray) {
   let n = inputArray.length;
   if(n === 0) {return null;}
   let avg = mean(inputArray);
   let sum = 0;
   for(let i = 0; i < n; i++){
      sum += Math.pow(inputArray[i] - avg, 2);
   }
   return sum/(n-1);
}

//returns NaN for single element arrays, and null for empty arrays
function stdev(inputArray) {
   let sigmaSquared = variance(inputArray);
   if (sigmaSquared == null) {
      return null;
   } else {
   return Math.pow(sigmaSquared, 0.5);
   }
}

//compute the following probabilities using z-scores: 
//probability that x < a (mode 0)
//probability that a < x < b (mode 1)
//probability that a < x (mode 2)
function zScore(inputArray, mode, a, b) {
   let mu = mean(inputArray);
   let sigma = stdev(inputArray);
   switch (mode) {
      case 0: return integrateGaussian(-10, (a-mu)/sigma);
      case 1: return integrateGaussian((a-mu)/sigma, (b-mu)/sigma);
      case 2: return integrateGaussian((a-mu)/sigma, 10);
      default: console.log("Invalid value for mode given."); return null;
   }
}

// Takes the indefininte integral of the standard normal distribution between the specified enpoints
function integrateGaussian(leftEnd, rightEnd) {
   zScore([3,2,1], 2, 1, 5);
   //TODO
}

//for testing
//array = [4, 5, 6, 7, 10];
//console.log("five Number Sumary: " + fiveNumSummary(array));
//console.log("mean (avergae):     " + mean(array));
//console.log("variance:           " + variance(array));
//console.log("Standard deviation: " + stdev(array));

