import './App.css'

function App() {

    function makeLink() {
        const inputText = document.getElementById('searchBar').value;
        return "www.ceneo.pl/;szukaj-" + inputText
    }

    return(
        <>
            <h1>Wyszukaj swój produkt</h1>
            <input type="text" name="searchBar" id="searchBar" />
            <button onClick={makeLink}>Szukaj</button>
        </>
    )
}

export default App