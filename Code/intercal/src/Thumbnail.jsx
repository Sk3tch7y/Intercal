import React, { useState } from 'react';
import ViewData from './ViewData';
import './/styles/styles.css';
import './/styles/thumbnail.css'
//uses term assigned by dashboard logic to display data of listening post
const Thumbnail = ({ monitoringPost }) => {
    
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    let post = 
    (<div className = 'post' onClick = {openModal}>
        <div className = 'postID'>
            <h6>{monitoringPost.postId}</h6>
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
            {showModal && <ViewData onClose={closeModal} data={monitoringPost} />}
        </div>
    );
};
export default Thumbnail;

