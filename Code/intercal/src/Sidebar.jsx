import React, {useEffect, useState} from 'react';
import './/styles/styles.css';
import './/styles/sidebarStyles.css'
import Thumbnail from './Thumbnail'; 
import ViewData from './ViewData.jsx';

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
   // setFav(sampleFavs); 
  }
  let as = favs.map((fav) =>{
    console.log(fav);
    return <Thumbnail monitoringPost={fav}></Thumbnail>;
  });

  //TODO: username should be from session
  let username = 'test123';
  const getSaveData = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/getSaveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        if (response.ok) {
            console.log('data retrieval successful');
            //TODO: get the savedata json list
            const data = await response.json();
            if(!data){
              console.log('No bookmarks found.');
              return;
            }
            let dataList = JSON.parse(data);
            dataList.forEach(element => {
              console.log(element);
             // element = JSON.parse(element);
              addFav({postId: element.postId, content: element.postName, waterLevel: 'placeholder'});
            });
            console.log('displaying bookmarks');

        } 
    } catch (error) {
        console.error('Error occurred during data retrieval:', error);
    }
};
  //getSaveData();//TODO: 'e' has to be passed in here 
  return (
  <div className = 'sidebar'  onClick={getSaveData}>
    {as}
  </div>);
}

