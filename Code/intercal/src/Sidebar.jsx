import React, {useEffect, useState} from 'react';
import './/styles/styles.css';
import './/styles/sidebarStyles.css'
import Thumbnail from './Thumbnail'; // Import the 'Thumbnail' component
import { sampleFavs } from './sampleFavs';

export default function Sidebar() {
  const [favs, setFav] = useState([]);
 
  //get data from the server
  /*
  useEffect(() => {
    fetch('')//TODO: needs to be filled
      .then(response => response.json())
      .then(data => setFav(data))
      .catch(error => console.error(error));
  }, []);
  */

  function addFav(newFav){
    setFav(newFav =>{
      console.log(newFav);
      let newAr = [...favs, newFav,];
      return newAr;
    });
  }
  
  //test


  if(favs.length === 0){
    setFav(sampleFavs); 
  }
  let as = favs.map((fav) =>{
    console.log(fav);
    return <Thumbnail monitoringPost={fav} ></Thumbnail>;
  });
  
  return (
  <div className = 'sidebar'>
    {as}
  </div>);
}

