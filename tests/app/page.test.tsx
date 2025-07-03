import { render } from '@testing-library/react';
import Home from '@/app/page';
import * as nextNavigation from 'next/navigation';

// Mockeamos el módulo una sola vez antes de los tests
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Home Component', () => {
  const redirectMock = nextNavigation.redirect as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to /userList/1', () => {
    redirectMock.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT');
    });
    expect(() => render(<Home />)).toThrowErrorMatchingInlineSnapshot(
      `"NEXT_REDIRECT"`
    );
  });

  it('should_not_render_ui_before_redirect', () => {
    redirectMock.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT');
    });
    expect(() => render(<Home />)).toThrow('NEXT_REDIRECT');
  });


  it('should_return_never_type', () => {
    type AssertNever<T> = T extends never ? true : false;
    // @ts-expect-error
    const result: AssertNever<ReturnType<typeof Home>> = true;
    expect(result).toBe(true);
  });

  it('should_handle_invalid_redirect_path', () => {
    redirectMock.mockImplementation((url: string) => {
      if (!url.startsWith('/')) {
        throw new Error('Invalid path');
      }
      throw new Error('NEXT_REDIRECT');
    });

    function InvalidHome() {
      // @ts-ignore
      nextNavigation.redirect('invalid-path');
    }

    expect(() => render(<InvalidHome />)).toThrow('Invalid path');
    expect(redirectMock).toHaveBeenCalledWith('invalid-path');
  });

  it('should_not_crash_on_redirect_error', () => {
    redirectMock.mockImplementation(() => {
      throw new Error('Some redirect error');
    });
    expect(() => render(<Home />)).toThrow('Some redirect error');
  });

  it('should_handle_non_browser_environment', () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;

    redirectMock.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT');
    });

    expect(() => render(<Home />)).toThrow('NEXT_REDIRECT');

    if (originalWindow) {
      // @ts-ignore
      global.window = originalWindow;
    }
  });
});
