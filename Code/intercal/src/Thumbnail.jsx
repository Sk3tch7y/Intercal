import React, { useState } from 'react';

import './/styles/thumbnail.css'
//uses term assigned by dashboard logic to display data of listening post
const Thumbnail = ({ monitoringPost }) => {
    let post = 
    (<div className = 'post'>
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
        <div className = 'postThumbnail'>
            {post}
        </div>
    );
};
export default Thumbnail;

