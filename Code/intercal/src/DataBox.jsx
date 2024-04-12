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
  const [postId, setPostId] = useState(0);
    const openModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };
    const mark = (e) => {
        e.preventDefault();
        //todo: send get request to server to mark the data
        let url = '/api/markData';
        fetch(url+postId)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            setPostId(data.postId);
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
    </div>
    {as}
    {showModal && <ViewData onClose={closeModal} data={data}  />}
  </div>);
}

