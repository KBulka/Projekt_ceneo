function Product({ name, price, productURL, imgURL, category }) {
    return (
        <a className='product' href={productURL} target="_blank">
            <img src={imgURL} alt="Zdjęcie produktu" />
            <div className="productInfo">
                <h2>{name}</h2>
                <p>Kategoria: {category}</p>
                <p><b>{price} zł</b></p>
            </div>
        </a>
    );
}

export default Product;