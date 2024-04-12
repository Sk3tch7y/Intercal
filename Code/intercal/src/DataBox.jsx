import React, {useEffect, useState} from 'react';
import ViewData from './ViewData.jsx';
import './/styles/styles.css';
import './/styles/databox.css';
export default function DataBox( {data} ) {
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
  const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };
    
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const flag = (e) => {
      e.preventDefault();
      let url = 'http://localhost:8080/flagData?postId=';
      console.log(data.postId);
      fetch(url+ data.postId + "&username="+getCookie('username'))
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => console.error(error));
    }
    const mark = (e) => {
        e.preventDefault();
        //todo: send get request to server to mark the data
        let url = 'http://localhost:8080/markData?postId=';
        console.log(data.postId);
        fetch(url+ data.postId + "&username="+getCookie('username') + "&postName=" + data.name)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch(error => console.error(error));
    };

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    };
  let as = (
    <div className = 'data' onClick={openModal}>
      <div className = 'dataID'>
        <h6>{data.postId}</h6>
      </div>
      <div className = 'name'>
        <h6>{data.name}</h6>
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
    <div className = 'head'>
        <button className='mark' onClick={mark}>👀</button>
        {getCookie('state') === 'admin' ? (<button className='flag' onClick={flag}>🚩</button>) : ""}
    </div>
    {as}
    {showModal && <ViewData onClose={closeModal} data={data}  />}
  </div>);
}

