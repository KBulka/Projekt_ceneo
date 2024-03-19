import Product from "./product";

function ProductList({ products }) {
  return (
    <div className="products">
      {/* <button>Następna strona</button> */}
      {products.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          price={product.price}
          productURL={product.productURL}
          imgURL={product.imgURL}
          createdAt={product.createdAt}
          updatedAt={product.updatedAt}
        />
      ))}
    </div>
  );
}

export default ProductList;
