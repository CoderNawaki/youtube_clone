import { render, screen } from '@testing-library/react';

import AppErrorBoundary from '../../components/shared/AppErrorBoundary';

const ThrowingComponent = () => {
  throw new Error('Boom');
};

describe('AppErrorBoundary', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders the fallback UI when a child throws', () => {
    render(
      <AppErrorBoundary>
        <ThrowingComponent />
      </AppErrorBoundary>
    );

    expect(
      screen.getByText('Unexpected application error')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'The page failed to render. Try refreshing or returning to the homepage.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
