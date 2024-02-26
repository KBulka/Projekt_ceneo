import './App.css'


function App() {

    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => {

    console.log(data);
    })
    .catch(error => {

    console.error('Error:', error);
    });


    function makeLink() {
        console.log("test");
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