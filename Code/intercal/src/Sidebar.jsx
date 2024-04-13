import React, {useEffect, useState} from 'react';
import './/styles/styles.css';
import './/styles/sidebarStyles.css'
import Thumbnail from './Thumbnail'; 

import { useSharedState } from './useSharedState.js';


export default function Sidebar() {
  const [favs, setFav] = useState([]);
  const [gotBookmarks, setGotBookmarks] = useState(false);
  const [sharedState, setSharedState] = useSharedState();

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
    setFav([...favs, newFav]);
  }
  //fixed the cookie issue by adding this function
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const getSaveData = async () => {
    try {
      const username = getCookie("username");

        const response = await fetch('http://localhost:8080/getSaveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        });

        if (response.ok) {
            console.log('data retrieval successful');
            const data = await response.json();
            if(!data){
              console.log('No bookmarks found.');
              return;
            }
            let dataList = JSON.parse(data);
            const newFavs = dataList.map(element => {
              console.log('element:', element);
              return element;
            });
            setFav(newFavs);
            console.log('displaying bookmarks');
            console.log(favs);
        } 
    } catch (error) {
        console.error('Error occurred during data retrieval:', error);
    }
};

//test
useEffect(() => {
  if (!gotBookmarks) {
    getSaveData();
    setGotBookmarks(true);
  }
  if(sharedState !== null){
    getSaveData();
    setSharedState(null);
  }
}, [gotBookmarks, sharedState]);
  if(favs.length === 0){
   // setFav(sampleFavs); 
  }
  let as = favs.map((fav) =>{
    console.log(fav);
    return <Thumbnail key={fav.postId}monitoringPost={fav} getSaveData={getSaveData}></Thumbnail>;
  });
  
  return (
  <div className = 'sidebar'>
    {as}
  </div>);
}

