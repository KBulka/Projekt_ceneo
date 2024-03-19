// import ImageComponent from "./image";

function Product({ name, price, productURL, imgURL, createdAt, updatedAt }) {
  return (
    <a className="product" href={productURL} target="_blank">
      <img src={imgURL} loading="lazy" alt="Zdjęcie produktu" />
      {/* <ImageComponent imageUrl={imgURL} /> */}
      <div className="productInfo">
        <h2>{name}</h2>
        <p>Data dodania: {createdAt}</p>
        <p>Data ostatniej modyfikacji: {updatedAt}</p>
        <p>
          <b>{price} zł</b>
        </p>
      </div>
    </a>
  );
}

export default Product;
