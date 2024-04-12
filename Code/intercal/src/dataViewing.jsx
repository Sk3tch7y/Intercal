import React, {Fragment, useEffect, useState } from 'react';
import './styles/dataViewing.css'
import './styles/viewData.css'
import { fiveNumSummary, mean, variance, stdev, probability } from './stats';
import { parseDailyData, parseMonthlyData, parseAnnualMaxData, parseAnnualMinData } from './parseData';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { Slider } from '@mui/material';

let id = "01AD001";
//Sample output from /server/exampleQuery.js for testing

let exampleDailyData2 = 
[
  [
    [ 1951, 10, 1, 3.650000095367432 ],
    [ 1951, 10, 2, 3.650000095367432 ],
    [ 1951, 10, 3, 3.7100000381469727 ],
    [ 1951, 10, 4, 3.7100000381469727 ],
    [ 1951, 10, 5, 3.7100000381469727 ],
    [ 1951, 10, 6, 3.849999904632568 ],
    [ 1951, 10, 7, 3.910000085830689 ],
    [ 1951, 10, 8, 4.019999980926514 ],
    [ 1951, 10, 9, 4.559999942779541 ],
    [ 1951, 10, 10, 5.039999961853027 ],
    [ 1951, 10, 11, 5.659999847412109 ],
    [ 1951, 10, 12, 6.989999771118164 ],
    [ 1951, 10, 13, 6.539999961853027 ],
    [ 1951, 10, 14, 6.539999961853027 ],
    [ 1951, 10, 15, 6.460000038146973 ],
    [ 1951, 10, 16, 6.289999961853027 ],
    [ 1951, 10, 17, 6.059999942779541 ],
    [ 1951, 10, 18, 5.889999866485596 ],
    [ 1951, 10, 19, 5.71999979019165 ],
    [ 1951, 10, 20, 5.409999847412109 ],
    [ 1951, 10, 21, 5.210000038146973 ],
    [ 1951, 10, 22, 4.980000019073486 ],
    [ 1951, 10, 23, 4.760000228881836 ],
    [ 1951, 10, 24, 4.639999866485596 ],
    [ 1951, 10, 25, 5.039999961853027 ],
    [ 1951, 10, 26, 5.800000190734863 ],
    [ 1951, 10, 27, 6.539999961853027 ],
    [ 1951, 10, 28, 7.25 ],
    [ 1951, 10, 29, 8.4399995803833 ],
    [ 1951, 10, 30, 8.829999923706055 ],
    [ 1951, 10, 31, 8.949999809265137 ],
    [ 1951, 11, 1, 8.949999809265137 ],
    [ 1951, 11, 2, 8.75 ],
    [ 1951, 11, 3, 8.949999809265137 ],
    [ 1951, 11, 4, 11.199999809265137 ],
    [ 1951, 11, 5, 16.299999237060547 ],
    [ 1951, 11, 6, 25 ],
    [ 1951, 11, 7, 29.700000762939453 ],
    [ 1951, 11, 8, 31.700000762939453 ],
    [ 1951, 11, 9, 31.399999618530277 ],
    [ 1951, 11, 10, 30.899999618530277 ],
    [ 1951, 11, 11, 30.600000381469727 ],
    [ 1951, 11, 12, 28.899999618530277 ],
    [ 1951, 11, 13, 27.5 ],
    [ 1951, 11, 14, 25.700000762939453 ],
    [ 1951, 11, 15, 25.399999618530277 ],
    [ 1951, 11, 16, 26.600000381469727 ],
    [ 1951, 11, 17, 30.600000381469727 ],
    [ 1951, 11, 18, 32.79999923706055 ],
    [ 1951, 11, 19, 33.70000076293945 ],
    [ 1951, 11, 20, 33.099998474121094 ],
    [ 1951, 11, 21, 31.100000381469727 ],
    [ 1951, 11, 22, 28.600000381469727 ],
    [ 1951, 11, 23, 26.100000381469727 ],
    [ 1951, 11, 24, 24.5 ],
    [ 1951, 11, 25, 22.600000381469727 ],
    [ 1951, 11, 26, 21.799999237060547 ],
    [ 1951, 11, 27, 20.200000762939453 ],
    [ 1951, 11, 28, 18.100000381469727 ],
    [ 1951, 11, 29, 16.899999618530273 ],
    [ 1951, 11, 30, 16.299999237060547 ],
    [ 1951, 12, 1, 15.800000190734863 ],
    [ 1951, 12, 2, 15.699999809265137 ],
    [ 1951, 12, 3, 15.199999809265137 ],
    [ 1951, 12, 4, 14.699999809265137 ],
    [ 1951, 12, 5, 14.100000381469728 ],
    [ 1951, 12, 6, 14.100000381469728 ],
    [ 1951, 12, 7, 15.5 ],
    [ 1951, 12, 8, 20.100000381469727 ],
    [ 1951, 12, 9, 26.200000762939453 ],
    [ 1951, 12, 10, 33.400001525878906 ],
    [ 1951, 12, 11, 36.20000076293945 ],
    [ 1951, 12, 12, 35.099998474121094 ],
    [ 1951, 12, 13, 33.099998474121094 ],
    [ 1951, 12, 14, 30.299999237060547 ],
    [ 1951, 12, 15, 26.899999618530277 ],
    [ 1951, 12, 16, 24 ],
    [ 1951, 12, 17, 21.899999618530277 ],
    [ 1951, 12, 18, 20.200000762939453 ],
    [ 1951, 12, 19, 20.600000381469727 ],
    [ 1951, 12, 20, 18.899999618530277 ],
    [ 1951, 12, 21, 18.299999237060547 ],
    [ 1951, 12, 22, 17.799999237060547 ],
    [ 1951, 12, 23, 17 ],
    [ 1951, 12, 24, 16.299999237060547 ],
    [ 1951, 12, 25, 15.5 ],
    [ 1951, 12, 26, 15.199999809265137 ],
    [ 1951, 12, 27, 14.5 ],
    [ 1951, 12, 28, 14.199999809265137 ],
    [ 1951, 12, 29, 14.100000381469728 ],
    [ 1951, 12, 30, 13.399999618530272 ],
    [ 1951, 12, 31, 12.300000190734863 ],
    [ 1952, 1, 1, 11.800000190734863 ],
    [ 1952, 1, 2, 11.600000381469728 ],
    [ 1952, 1, 3, 11.399999618530272 ],
    [ 1952, 1, 4, 11.300000190734863 ],
    [ 1952, 1, 5, 11.100000381469728 ],
    [ 1952, 1, 6, 10.800000190734863 ],
    [ 1952, 1, 7, 10.600000381469728 ],
    [ 1952, 1, 8, 10.399999618530272 ]
  ]
];

//TODO - Change exampDailyData to the output of a user-based query.
let parsedData = await parseDailyData(id);
//let parsedData = parseMonthlyData(exampleMonthlyData2);
//let parsedData = parseAnnualMaxData(exampleAnnualData2);
//let parsedData = parseAnnualMinData(exampleAnnualData2);
let FiveNumSum = fiveNumSummary(parsedData.data);
let avg = mean(parsedData.data);
let vari = variance(parsedData.data);
let standardDeviation = stdev(parsedData.data);
let station = '<station>';
let freq = parsedData.frequency;

export default function Graph(data) {
  
  return <>
  <ShowLineChart />
  <p></p>
  <Probability />
  <p></p>
  <ShowFiveNumSum />
  <p></p>
  <AdditionalStats />
  <p></p>
  </>

function ShowLineChart() {

  const chartData = {
    labels: parsedData.dates,
    datasets: [{
      label: parsedData.frequency + " data from " + station,
      data: parsedData.data,
      backgroundColor: ["rgba(0, 0, 0, 1.0)"],
      borderColor: ["rgba(0,0, 0, 1.0)"] 
    }]
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "black", 
          font: {
            size: 16
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
          autoSkipPadding: 20
        }
      },
      y: {
        ticks: {
          color: 'black'
        }
      }
    }
  };

    return (<Line className='graph'data={chartData} options = {chartOptions} />);
  
}

function ShowFiveNumSum() {
  return ( <>
  <h3> The five number summary of this data:</h3>
    <h4>Minimum:         {FiveNumSum[0].toPrecision(4)}</h4>
    <h4>First quartile:  {FiveNumSum[1].toPrecision(4)}</h4>
    <h4>Median:          {FiveNumSum[2].toPrecision(4)}</h4>
    <h4>Third quartile:  {FiveNumSum[3].toPrecision(4)}</h4>
    <h4>Maximum:         {FiveNumSum[4].toPrecision(4)}</h4>
    </>
  );
}

function Probability() {

  let data = parsedData.data;
  let IQR = FiveNumSum[3]-FiveNumSum[1];
  let initialValue = (FiveNumSum[0]+FiveNumSum[4])/2;
  let left = FiveNumSum[0]-IQR/4;
  let right = FiveNumSum[4]+IQR/4;
  let initRange = [(initialValue-(IQR/4)), initialValue+(IQR/4)];

  const [value1, setValue1] = useState(initialValue);
  const [value2, setValue2] = useState(initRange);
  const [value3, setValue3] = useState(initialValue);

  const [likelyhood1, setLikelyhood1] = useState(probability(data, 0, initialValue));
  const [likelyhood2, setLikelyhood2] = useState(probability(data, 1, initRange[0], initRange[1]));
  const [likelyhood3, setLikelyhood3] = useState(probability(data, 2, initialValue));

  const handleChange1 = (event, newValue1) => {
    setValue1(newValue1);
    setLikelyhood1(probability(data, 0, newValue1));
  };

  const handleChange2 = (event, newValue2) => {
    setValue2(newValue2);
    setLikelyhood2(probability(data, 1, newValue2[0], newValue2[1]));
  };

  const handleChange3 = (event, newValue3) => {
    setValue3(newValue3);
    setLikelyhood3(probability(data, 2, newValue3));
  };

  return ( <>
  <h3> Drag the sliders to calculate probabilities</h3>
        <h5>There is a {(likelyhood1*100).toPrecision(3)}% chance that a given {freq.toLowerCase()} value
          is below {value1.toPrecision(3)} units for station {station}.</h5>
        <Slider
        defaultValue={initialValue}
        valueLabelDisplay="auto"
        value = {value1}
        step={0.1}
        onChange={handleChange1}
        min = {left}
        max = {right}
        ></Slider>

        <h5>There is a {(likelyhood2*100).toPrecision(3)}% chance that a given {freq.toLowerCase()} value
          is between {value2[0].toPrecision(3)} and {value2[1].toPrecision(3)} units for station {station}.</h5>
        <Slider
        getAriaLabel={() => 'water range'}
        defaultValue={initRange}
        valueLabelDisplay="auto"
        value = {value2}
        step={0.1}
        onChange={handleChange2}
        min = {left}
        max = {right}
        ></Slider>

        <h5>There is a {(likelyhood3*100).toPrecision(3)}% chance that a given {freq.toLowerCase()} value
          is above {value3.toPrecision(3)} units for station {station}.</h5>
        <Slider
        defaultValue={initialValue}
        valueLabelDisplay="auto"
        value = {value3}
        step={0.1}
        onChange={handleChange3}
        min = {left}
        max = {right}
        ></Slider>
      </>

  );
  
}

function AdditionalStats() {

  return ( <>
  <h3> Additional statistical information for this data:</h3>
    <h4>Mean:               {avg.toPrecision(4)}</h4>
    <h4>Variance:           {vari.toPrecision(4)}</h4>
    <h4>Standard deviation: {standardDeviation.toPrecision(4)}</h4>
    </>
  );
}

}
