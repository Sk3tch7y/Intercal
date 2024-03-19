import React, { useEffect, useState } from 'react';

function ThumbData({ post }) {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        // Make API request here and update the state with the response data
    }, []);
    //TODO: Add relevant Data and complete Styling
    return (
        <div className="box">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
        </div>
    );
}

export default ThumbData;