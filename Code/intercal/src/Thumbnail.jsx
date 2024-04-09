import React, { useState } from 'react';
import ViewData from './ViewData';
import './/styles/styles.css';
import './/styles/thumbnail.css'
//uses term assigned by dashboard logic to display data of listening post

const Thumbnail = ({ monitoringPost }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [postId, setPostId] = useState(0);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const unmark = (e) => {
        e.preventDefault();
        //todo: send get request to server to unmark the post
        let url = '/api/markData';
        fetch(url+postId)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            setPostId(data.postId);
          })
          .catch(error => console.error(error));
    };

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

