import React, {useEffect, useState} from 'react';
import './/styles/styles.css';
<<<<<<< Updated upstream
import './/styles/sidebarStyles.css'

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
=======
import './/styles/dashboard.css'


export default function Dashboard() {
  const [watched, setWatched] = useState([]);
>>>>>>> Stashed changes

  //get data from the server
  /*
  useEffect(() => {
    fetch('')//TODO: needs to be filled
      .then(response => response.json())
      .then(data => setFav(data))
      .catch(error => console.error(error));
  }, []);
  */
<<<<<<< Updated upstream
  function addAlert(newAl){
    setAlerts(newAl =>{
      console.log(newAl);
      let newAr = [...alerts, newAl,];
=======
  // this function is purely test atm, as the actual favorite button is going to be built into the 
  function addWatched(newWatch){
    setWatched(newWatch =>{
      console.log(newWatch);
      let newAr = [...watched, newWatch,];
>>>>>>> Stashed changes
      return newAr;
    });
  }

<<<<<<< Updated upstream
    let as = alerts.map((fav) =>{
      return <a class = 'favorite' href = '{}'>{fav.id}</a>
    });
  return ( );
=======
    let as = watched.map((fav) =>{
      return <a class = 'favorite' href = '{}'>{fav.id}</a>
    });
  return (
  <div className='dashboard'>
    {}
  </div> 
  );
>>>>>>> Stashed changes
}



