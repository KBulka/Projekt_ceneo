// test sprawdzajacy poprawność sortowania (rosnąco) na podstawie przykładowych danych

import { sortByName } from '../src/App';

test('sortowanie w porządku rosnącym', () => {
  const products = [
    { name: 'B', price: 100 },
    { name: 'A', price: 200 },
  ];

  const sortedProducts = sortByName(products);
  expect(sortedProducts[0].name).toBe('A');
});

