import React, { useState } from 'react';
import './/styles/searchbarStyles.css'
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        let url = ''; //add search url
        setSearchTerm(e.target.value);
        // Perform search logic here
        fetch(url + searchTerm)
            .then(response => {
                response.json()
                    .then(data => {
                        
                        const result = data;
                        
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className = 'searchBar'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
        </div>
    );
};

export default SearchBar;