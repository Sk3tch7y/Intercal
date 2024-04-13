import React, { useState } from 'react';
import ViewData from './ViewData';
import './/styles/styles.css';
import './/styles/thumbnail.css'
//uses term assigned by dashboard logic to display data of listening post

const Thumbnail = ({ monitoringPost, getSaveData }) => {
    
    const [showModal, setShowModal] = useState(false);
    const data = monitoringPost;

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const unmark = (e) => {
        e.preventDefault();
        //todo: send get request to server to mark the data
        let url = 'http://localhost:8080/unmarkData?postId=';
        console.log(data.postId);
        fetch(url+ data.postId + "&username="+getCookie('username'))
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            getSaveData();
          })
          .catch(error => console.error(error));
          
    };

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let post = 
    (<div className = 'post' onClick = {openModal}>
        <div className = 'postID'>
            <h6>{monitoringPost.postName}</h6>
        </div>
        <div className = 'content'>
            <h6>{monitoringPost.content}</h6>
        </div>
        <div className = 'waterLevel'>
            <h6>{monitoringPost.waterLevel}</h6>
        </div>
    </div>);


    return (
        <div className='postThumbnail'>
            {post}
            <button className='unmark' onClick={unmark}>❌</button>

            {showModal && <ViewData onClose={closeModal} data={monitoringPost} />}
        </div>
    );
};


export default Thumbnail;

