import React, {useEffect, useState} from 'react';
import './/styles/styles.css';
import './/styles/sidebarStyles.css'

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  //get data from the server
  /*
  useEffect(() => {
    fetch('')//TODO: needs to be filled
      .then(response => response.json())
      .then(data => setFav(data))
      .catch(error => console.error(error));
  }, []);
  */
  function addAlert(newAl){
    setAlerts(newAl =>{
      console.log(newAl);
      let newAr = [...alerts, newAl,];
      return newAr;
    });
  }

    let as = alerts.map((fav) =>{
      return <a class = 'favorite' href = '{}'>{fav.id}</a>
    });
  return ( );
}



