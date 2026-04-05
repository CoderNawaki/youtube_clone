import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from '../../components/SearchBar';
import { renderWithRouter } from '../test-utils';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('SearchBar', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('navigates to the search route and clears the input on submit', async () => {
    const user = userEvent.setup();

    renderWithRouter(<SearchBar />);

    const input = screen.getByPlaceholderText('Search...');

    await user.type(input, 'React tutorials');
    await user.click(screen.getByRole('button'));

    expect(mockedNavigate).toHaveBeenCalledWith('/search/React tutorials');
    expect(input).toHaveValue('');
  });

  it('does not navigate when the input is empty', async () => {
    const user = userEvent.setup();

    renderWithRouter(<SearchBar />);

    await user.click(screen.getByRole('button'));

    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
