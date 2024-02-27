import './App.css';
import { useState } from 'react';
import ProductList from './components/productList';

function App() {
    const [searchInput, setSearchInput] = useState('');
    const [products, setProducts] = useState([]);
    const [activeButton, setActiveButton] = useState(null);

    const fetchData = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchInput }),
        })
        .then(response => response.json())
        .then(data => {
            const productsWithFloatPrice = data.map(product => {
                const priceWithoutSpaces = product.price.replace(/\s/g, '');
                const priceWithDot = priceWithoutSpaces.replace(',', '.');
                const parsedPrice = parseFloat(priceWithDot).toFixed(2);
                return {
                    ...product,
                    price: parsedPrice
                };
            });

            setProducts(productsWithFloatPrice);
            console.log(data)
            console.log(productsWithFloatPrice)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleInputChange = event => {
        setSearchInput(event.target.value);
    };



    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };

    const sortByName = () => {
        const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
        handleButtonClick('sortByName');
      };

      const sortByNameReverse = () => {
        const sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
        setProducts(sortedProducts);
        handleButtonClick('sortByNameReverse');
      };

      const sortByPriceAscending = () => {
        const sortedProducts = [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setProducts(sortedProducts);
        handleButtonClick('sortByPriceAscending');
      };

      const sortByPriceDescending = () => {
        const sortedProducts = [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        setProducts(sortedProducts);
        handleButtonClick('sortByPriceDescending');
      };

    return (
        <>
            <form onSubmit={fetchData}>
                <label htmlFor="searchBar">Wyszukaj swój produkt</label>
                <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="Wpisz nazwę produktu"
                value={searchInput}
                onChange={handleInputChange}
                />
                <input id='searchBtn' type="submit" value="Szukaj" />
            </form>

            <div className="sortingOptions">
                <button className={activeButton === 'sortByName' ? 'active' : ''} onClick={sortByName}>Sortuj A-Z</button>
                <button className={activeButton === 'sortByNameReverse' ? 'active' : ''} onClick={sortByNameReverse}>Sortuj Z-A</button>
                <button className={activeButton === 'sortByPriceAscending' ? 'active' : ''} onClick={sortByPriceAscending}>Cena rosnąco</button>
                <button className={activeButton === 'sortByPriceDescending' ? 'active' : ''} onClick={sortByPriceDescending}>Cena malejąco</button>
            </div>

            <ProductList products={products} />
        </>
    );
}

export default App;

