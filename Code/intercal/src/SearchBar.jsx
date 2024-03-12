import React, { useState } from 'react';
import './/styles/searchbarStyles.css'
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        //Todo Perform search logic here
        fetch('url' + searchTerm)
            .then(response => response.json())
            .then(data => {
            
            })
            .catch(error => {
            // Handle any errors
            });
    };

    return (
        <div className = 'searchBar'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
};


export default SearchBar;

