import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';
// Ensure Error404 is not mocked, as per instructions

describe('NotFound Component', () => {
  test('shouldRenderError404Component', () => {
    render(<NotFound />);
    // Error404 renders "Page Not Found" text, so check for that
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  test('shouldDisplayPageNotFoundMessage', () => {
    render(<NotFound />);
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  test('shouldRenderRegresarButton', () => {
    render(<NotFound />);
    expect(screen.getByRole('button', { name: /regresar/i })).toBeInTheDocument();
  });

  test('shouldNotRenderUnintendedContent', () => {
    render(<NotFound />);
    // Check that only expected elements are present
    expect(screen.queryByText(/unexpected/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('unrelated-element')).not.toBeInTheDocument();
    // The main expected content is the error message and button
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /regresar/i })).toBeInTheDocument();
  });
});