// test ten sprawdza czy ProductList renderuje poprawną ilość produktów (tutaj fałszywe przykładowe produkty)

import { render } from '@testing-library/react';
import ProductList from '../components/ProductList';

test('renderowanie poprawnej ilośc produktów', () => {
  const products = [
    { name: 'Product 1', price: 100, productURL: 'https://example.com/product1', imgURL: 'https://example.com/image1', category: 'Category 1' },
    { name: 'Product 2', price: 200, productURL: 'https://example.com/product2', imgURL: 'https://example.com/image2', category: 'Category 2' },
  ];

  const { getAllByRole } = render(<ProductList products={products} />);
  const productItems = getAllByRole('link');

  expect(productItems).toHaveLength(products.length);
});
