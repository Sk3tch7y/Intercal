import React from 'react';
import { useState } from 'react';
import { fiveNumSummary } from './stats';
import { parseDailyData } from './parseData';

//For testing
//let sampleData = parseDailyData(example()).data;
let exampleDailyData = 
[
  [
    [ 1926, 10, 1, 108 ],
    [ 1926, 10, 2, 85.5 ],
    [ 1926, 10, 3, 73.5999984741211 ],
    [ 1926, 10, 4, 66.5 ],
    [ 1926, 10, 5, 73.5999984741211 ],
    [ 1926, 10, 6, 73.5999984741211 ],
  ],
[]
];

//let sampleData = [3, 4, 5, 6, 7];
let sampleData = parseDailyData(exampleDailyData).data;

let FiveNumSum = fiveNumSummary(sampleData);
let display = <></>;  

export default function Graph(data) {
  return <>
  <MyButton />
  </>

function MyButton() {
  const [FiveNumberSumarry, setFiveNumberSumarry] = useState(FiveNumSum);
  
  function handleClick() {
    setFiveNumberSumarry(fiveNumSummary(sampleData));
    display =  <>
    <p>Minimum:         {FiveNumberSumarry[0]}</p>
    <p>First quartile:  {FiveNumberSumarry[1]}</p>
    <p>Median:          {FiveNumberSumarry[2]}</p>
    <p>Third quartile:  {FiveNumberSumarry[3]}</p>
    <p>Maximum:         {FiveNumberSumarry[4]}</p>
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


