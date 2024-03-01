// sprawdza działanie przycisku sortowania

import { render, fireEvent } from '@testing-library/react';
import App from '../src/';

test('sprawdza czy produkty są sortowane po kliknięciu', () => {
  const { getByText, getAllByRole } = render(<App />);

  const sortByNameBtn = getByText('Sortuj A-Z');
  fireEvent.click(sortByNameBtn);

  const productItems = getAllByRole('link');
});
