import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { server } from './mocks/server';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const originalWarn = console.warn;

beforeAll(() => {
  process.env.REACT_APP_RAPID_API_KEY = 'test-api-key';
  server.listen({ onUnhandledRequest: 'error' });

  vi.spyOn(console, 'warn').mockImplementation((message, ...args) => {
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
  vi.restoreAllMocks();
});
