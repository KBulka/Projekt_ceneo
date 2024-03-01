// ten test symuluje interakcje użytkownika z formularzem -> wyszukuje elementy formularza symuluje wprowadzenie wartości
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/';

test('symulacja interakcji użytkownika z formularzem', async () => {
  const { getByLabelText, getByText } = render(<App />);

  const searchBar = getByLabelText('Wyszukaj swój produkt');
  fireEvent.change(searchBar, { target: { value: 'laptop' } });

  const searchBtn = getByText('Szukaj');
  fireEvent.click(searchBtn);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
});
