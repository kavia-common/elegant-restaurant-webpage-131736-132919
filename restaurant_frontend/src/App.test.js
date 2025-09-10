import { render, screen } from '@testing-library/react';
import App from './App';

test('renders restaurant brand', () => {
  render(<App />);
  const brand = screen.getByText(/Casa Moderna/i);
  expect(brand).toBeInTheDocument();
});

test('renders menu section', () => {
  render(<App />);
  const menuHeading = screen.getByRole('heading', { name: /Our Menu/i });
  expect(menuHeading).toBeInTheDocument();
});
