import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

// Test 1: The NotFound component renders the Error404 component successfully.
describe('NotFound Component', () => {
  it('shouldRenderError404Component', () => {
    render(<NotFound />);
    // The Error404 component renders a message "Page Not Found"
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  // Test 2: The Error404 component displays the correct error message and UI elements.
  it('shouldDisplayErrorMessageAndUI', () => {
    render(<NotFound />);
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Lo sentimos, no se encontro el usuario que buscaba\./i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /regresar/i })).toBeInTheDocument();
  });

  // Test 3: The 'regresar' button is visible and rendered within the Error404 component.
  it('shouldRenderRegresarButton', () => {
    render(<NotFound />);
    const button = screen.getByRole('button', { name: /regresar/i });
    expect(button).toBeVisible();
  });

  // Test 5: The NotFound component renders correctly when used in a non-standard routing context.
  it('shouldRenderInNonStandardRoutingContext', () => {
    // Render NotFound outside of any router context
    render(<NotFound />);
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
