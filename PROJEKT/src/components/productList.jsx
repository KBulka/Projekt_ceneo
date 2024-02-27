import Product from './product';

function ProductList({ products }) {
    return (
        <div className="products">
            {products.map((product, index) => (
                <Product key={index} name={product.name} price={product.price} productURL={product.productURL} imgURL={product.imgURL} category={product.category}/>
            ))}
        </div>
    );
}

export default ProductList;