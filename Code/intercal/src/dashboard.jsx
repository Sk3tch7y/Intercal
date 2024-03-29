import React, {useEffect, useState} from 'react';
import './/styles/styles.css';
import './/styles/dashboard.css'
import DataBox from './DataBox';
import { sampleDash } from './testFiles/sampleDash';

export default function Dashboard() {
  const [watched, setWatched] = useState([]);

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
    if(watched.length === 0){
      setWatched(sampleDash); 
    }
    let as = watched.map((fav) =>{
      return <DataBox key ={fav.postId} data={fav} ></DataBox>;

    });

  return (
  <div className='dashboard'>
    {as}
  </div> 
  );
}



