import React from 'react';
import { useState } from 'react';
import { fiveNumSummary } from './stats';
import { parseDailyData, parseMonthlyData, parseAnnualMaxData, parseAnnualMinData } from './parseData';

//Sample output from /server/exampleQuery.js for testing
let exampleDailyData = 
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

let exampleMonthlyData =
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

let exampleAnnualData =
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

//TODO - Change exampleAnnualData to the output of a user-based query.
let parsedData = parseDailyData(exampleDailyData);
console.log(parsedData.startDate);
console.log(parsedData.endDate);
console.log(parsedData.frequency);
let data = parsedData.data;
let FiveNumSum = fiveNumSummary(data);
let display = <></>;  

export default function Graph(data) {
  return <>
  <ShowFiveNumSum />
  </>

function ShowFiveNumSum() {
  const [FiveNumberSumarry, setFiveNumberSumarry] = useState(FiveNumSum);
  
  function handleClick() {
    setFiveNumberSumarry(fiveNumSummary(data));
    display =  <>
    <p>Minimum:         {FiveNumSum[0]}</p>
    <p>First quartile:  {FiveNumSum[1]}</p>
    <p>Median:          {FiveNumSum[2]}</p>
    <p>Third quartile:  {FiveNumSum[3]}</p>
    <p>Maximum:         {FiveNumSum[4]}</p>
    </>;
  }

  return ( <>
    <button onClick={handleClick}> 
      5 - Number Sumarry </button>
    {display}
    </>
  );
}
}
