import DataGrid from "./datagrid";

function Product({ name, price, productURL, other, imgURL, category }) {
    return (
        <div className='product'>
            <a href={productURL}>
                <img src={imgURL} alt="" />
                <h2>{name}</h2>
            </a>
            <p>Price: {price}</p>
            <p>Category: {category}</p>
            <DataGrid arr={other} />
            <hr />
        </div>
    );
}

export default Product;