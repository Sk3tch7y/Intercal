import React, {useEffect, useState} from 'react';
import './/styles/styles.css';
import './/styles/dashboard.css'
import DataBox from './DataBox';
import { sampleDash } from './testFiles/sampleDash';

const Dashboard = ({watched, setWatched}) => {
  
  const [hasAddedSamples, setHasAddedSamples] = useState(false);
  //test files
  useEffect(() => {
      if (!hasAddedSamples) {
          setWatched(sampleDash);
          setHasAddedSamples(true);
      }
  }, [hasAddedSamples, sampleDash]);

  //get data from the server
  /*
  useEffect(() => {
    fetch('')//TODO: needs to be filled
      .then(response => response.json())
      .then(data => setFav(data))
      .catch(error => console.error(error));
  }, []);
  */
  // this function is purely test atm, as the actual favorite button is going to be built into the 
  function addWatched(newWatch){
    setWatched(newWatch =>{
      console.log(newWatch);
      let newAr = [...watched, newWatch,];
      return newAr;
    });
  }
  function setNewWatched(newWatched){
    setWatched(newWatched =>{
      return newWatched;
    });
  }

    let as = watched.map((post) =>{
      return <DataBox key ={post.postId} data={post} ></DataBox>;

    });

  return (
  <div className='dashboard'>
    {as}
  </div> 
  );
}

export default Dashboard;

