import React from 'react';
import { useState } from 'react';
import { fiveNumSummary } from './stats';

//For testing
let sampleData = [8, 9, 1, 8, 5, 10, 13, 70];
let FiveNumSum = fiveNumSummary(sampleData);
let display = <></>;  

export default function Graph(data) {
  console.log(data);
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


