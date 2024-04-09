import "./App.css";
import { useState } from "react";
import ProductList from "./components/productList";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const fetchDataCeneo = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/getProductsCeneo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        const producstWithDate = data.map((product) => {
          const createdAt = new Date(product.createdAt).toLocaleDateString(
            "pl-PL"
          );
          const updatedAt = new Date(product.updatedAt).toLocaleDateString(
            "pl-PL"
          );
          return {
            ...product,
            createdAt,
            updatedAt,
          };
        });

        setProducts(producstWithDate);
        console.log(data);
        // console.log(productsWithFloatPrice)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchData = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        const producstWithDate = data.map((product) => {
          const createdAt = new Date(product.createdAt).toLocaleDateString(
            "pl-PL"
          );
          const updatedAt = new Date(product.updatedAt).toLocaleDateString(
            "pl-PL"
          );
          return {
            ...product,
            createdAt,
            updatedAt,
          };
        });

        setProducts(producstWithDate);
        console.log(data);
        // console.log(productsWithFloatPrice)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(products);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const sortByName = () => {
    const sortedProducts = [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setProducts(sortedProducts);
    handleButtonClick("sortByName");
  };

  const sortByNameReverse = () => {
    const sortedProducts = [...products].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setProducts(sortedProducts);
    handleButtonClick("sortByNameReverse");
  };

  const sortByPriceAscending = () => {
    const sortedProducts = [...products].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    setProducts(sortedProducts);
    handleButtonClick("sortByPriceAscending");
  };

  const sortByPriceDescending = () => {
    const sortedProducts = [...products].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
    setProducts(sortedProducts);
    handleButtonClick("sortByPriceDescending");
  };

  return (
    <>
      <form>
        <label htmlFor="searchBar">Wyszukaj swój produkt</label>
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Wpisz nazwę produktu"
          value={searchInput}
          onChange={handleInputChange}
        />
        <input
          onClick={fetchData}
          className="searchBtn"
          id="searchBtnDB"
          type="button"
          value="Pobierz dane z bazy danych"
        />
        <input
          onClick={fetchDataCeneo} // Tutaj do zmienienia na funcje pobierająca dane z ceneo
          className="searchBtn"
          id="searchBtnCeneo"
          type="button"
          value="Pobierz dane z Ceneo"
        />
      </form>

      <div className="sortingOptions">
        <button
          className={activeButton === "sortByName" ? "active" : ""}
          onClick={sortByName}
        >
          Sortuj A-Z
        </button>
        <button
          className={activeButton === "sortByNameReverse" ? "active" : ""}
          onClick={sortByNameReverse}
        >
          Sortuj Z-A
        </button>
        <button
          className={activeButton === "sortByPriceAscending" ? "active" : ""}
          onClick={sortByPriceAscending}
        >
          Cena rosnąco
        </button>
        <button
          className={activeButton === "sortByPriceDescending" ? "active" : ""}
          onClick={sortByPriceDescending}
        >
          Cena malejąco
        </button>
      </div>

      <ProductList products={products} />
    </>
  );
}

export default App;
