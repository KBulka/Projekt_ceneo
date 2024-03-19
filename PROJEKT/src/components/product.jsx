function Product({ name, price, productURL, imgURL, category, createdAt, updatedAt }) {
    return (
        <a className='product' href={productURL} target="_blank">
            <img src={imgURL} alt="Zdjęcie produktu" />
            <div className="productInfo">
                <h2>{name}</h2>
                <p>Kategoria: {category}</p>
                <p>Data dodania: {createdAt}</p>
                <p>Data ostatniej modyfikacji: {updatedAt}</p>
                <p><b>{price} zł</b></p>
            </div>
        </a>
    );
}

export default Product;