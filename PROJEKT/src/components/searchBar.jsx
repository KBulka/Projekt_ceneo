import { useState } from 'react';

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    //wyslanie zapytanie do serwera
    const fetchData = () => {
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchInput }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    //przy wpisywaniu do pola input zmienia sie co znak
    const handleInputChange = event => {
        setSearchInput(event.target.value);
    };
    //strona
    return (
        <div className='searchBarContainer'>
            <h1>Wyszukaj swój produkt</h1>
            <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="Wpisz nazwę produktu"
                value={searchInput}
                onChange={handleInputChange}
            />
            <button onClick={fetchData} id='searchBtn'>Szukaj</button>
        </div>
    );
}

export default SearchBar;

