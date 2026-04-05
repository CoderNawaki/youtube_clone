import '@testing-library/jest-dom';

import { server } from './mocks/server';

const originalWarn = console.warn;

beforeAll(() => {
  process.env.REACT_APP_RAPID_API_KEY = 'test-api-key';
  server.listen({ onUnhandledRequest: 'error' });

  jest.spyOn(console, 'warn').mockImplementation((message, ...args) => {
    if (
      typeof message === 'string' &&
      message.includes('React Router Future Flag Warning')
    ) {
      return;
    }

    originalWarn(message, ...args);
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  console.warn.mockRestore();
});
