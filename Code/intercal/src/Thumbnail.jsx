import React, { useState } from 'react';
import './/styles/searchbarStyles.css'
//uses term assigned by dashboard logic to display data of listening post
const fragData = (searchTerm) => {
    const handleGet = (e) => {

        //TODO: Perform search logic here
        fetch('url' + searchTerm)
            .then(response => response.json())
            .then(data => {
            
            })
            .catch(error => {
            // Handle errors
            });
    };

    return (
        <div className = 'postThumbnail'>
            
        </div>
    );
};


export default fragData;

