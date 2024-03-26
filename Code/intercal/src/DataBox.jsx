import React, {useEffect, useState} from 'react';
import ThumbData from './ThumbData.jsx';
import './/styles/styles.css';
import './/styles/sidebarStyles.css'

export default function DataBox() {
  const [favs, setFav] = useState([]);
  let postId = 0;
  //get data from the server
  /*
  useEffect(() => {
    fetch('')//TODO: needs to be filled
      .then(response => response.json())
      .then(data => setFav(data))
      .catch(error => console.error(error));
  }, []);
  */
  //Set new data to be mapped

  let as = favs.map((fav) =>{
    return (
    <div className = 'dataBox'>
      
    </div>
    )
  });
  return (
  <div className = 'dataBox'>
    {as}
  </div>);
}

