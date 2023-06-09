import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders app title', () => {
    render(<App />);
    expect(screen.getByText('Github Repository Search')).toBeInTheDocument();
  });
});
