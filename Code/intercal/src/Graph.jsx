import React from 'react';
import { useState } from 'react';

export default function Graph(data) {
  console.log(data);
  return <>
  <MyButton />
  </>

function MyButton() {
  const [FiveNumberSumarry, setFiveNumberSumarry] = useState([0, 1, 2, 3, 4]);

  function handleClick() {
    setFiveNumberSumarry([5, 6, 7, 8, 9]);
  }

  return ( <>
    <button onClick={handleClick}> 
      5-Number Sumarry </button>
    <p>Minimum:         {FiveNumberSumarry[0]}</p>
    <p>First quartile:  {FiveNumberSumarry[1]}</p>
    <p>Median:          {FiveNumberSumarry[2]}</p>
    <p>Third quartile:  {FiveNumberSumarry[3]}</p>
    <p>Maximum:         {FiveNumberSumarry[4]}</p>
    </>
  );

}
  
}


