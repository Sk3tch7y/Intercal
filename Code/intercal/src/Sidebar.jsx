import React, {useEffect, useState} from 'react';
import './/styles/styles.css';

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

    let as = favs.map((fav) =>{
      return <a href = '{}'>{fav.id}</a>
    });
  return (
  <div className = 'sidebar'>
    {as}
  </div>);
}



