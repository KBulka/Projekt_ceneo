import './App.css';
import { useState } from 'react';
import ProductList from './components/productList';

function App() {
    const [searchInput, setSearchInput] = useState('');
    const [products, setProducts] = useState([]);

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
            setProducts(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
 
    const handleInputChange = event => {
        setSearchInput(event.target.value);
    };

    return (
        <div className='container'>
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

            <ProductList products={products} />
        </div>
    );
}

export default App;

