import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Error404 } from '@/app/components';
import image from '../../../../public/image.svg';

// jest.mock('next/image', () => (props: any) => {
//   // eslint-disable-next-line jsx-a11y/alt-text
//   return <img {...props} />;
// });
// expect(image).toHaveAttribute('src', expect.stringContaining('image.svg'));
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Error404', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shouldRenderAllError404Elements', () => {
    render(<Error404 />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Lo sentimos, no se encontro el usuario que buscaba.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /regresar/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /fondo/i })).toBeInTheDocument();
  });

  it('shouldRenderCorrectlyInNonStandardParent', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <section data-testid="non-standard-parent" style={{ padding: 20, background: 'pink' }}>
        {children}
      </section>
    );
    render(
      <Wrapper>
        <Error404 />
      </Wrapper>
    );
    expect(screen.getByTestId('non-standard-parent')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /regresar/i })).toBeInTheDocument();
  });

  it('shouldHandleNavigationFailureGracefully', () => {
    // Simulate navigation failure by throwing in mockPush
    mockPush.mockImplementation(() => { throw new Error('Navigation failed'); });
    render(<Error404 />);
    const button = screen.getByRole('button', { name: /regresar/i });
    expect(() => {
      fireEvent.click(button);
    }).not.toThrow();
    // Optionally, check that the UI is still present
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});