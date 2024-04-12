import React, { useState } from 'react';
import Dashboard from './dashboard';
import App from './App';
import './/styles/header.css'

const SearchBar = ({setWatched}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        let url = 'http://localhost:8080/search?searchTerm='; //add search url
        setSearchTerm(e.target.value);
        // Perform search
        fetch(url + searchTerm)
            .then(response => {
                if(response.ok){
                    console.log(response.ok);
                    console.log(response);
                    return response;
                }
                else{
                    let post = [{ postId: "Post ID 1", content: "Sample Content 1", waterLevel: "Normal" }];
                    return post;
                }
            })
            .then(data => {
                        
                const result = data;
                setWatched(result);
                
            })
            .catch(error => {
                console.error(error);
                setWatched([{ postId: "Post ID 1", content: "Sample Content 1", waterLevel: "Normal" }]);

            });
    };

    return (
        <div className = 'searchBar'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) =>{
                    setSearchTerm(e.target.value);

                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(e);
                    } 
                }}
            />
            </div>
    );
};


export default SearchBar;

