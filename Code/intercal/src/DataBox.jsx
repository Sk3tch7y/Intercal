import React, {useEffect, useState} from 'react';
import './/styles/styles.css';
import './/styles/databox.css'

export default function DataBox( {data} ) {
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

  let as = (
    <div className = 'data'>
      <div className = 'dataID'>
        <h6>{data.postId}</h6>
      </div>
      <div className = 'content'>
        <h6>{data.content}</h6>
      </div>
      <div className = 'waterLevel'>
        <h6>{data.waterLevel}</h6>
      </div>
    </div>
    );
  return (
  <div className = 'databox'>
    {as}
  </div>);
}

