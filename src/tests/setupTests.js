import '@testing-library/jest-dom';

const originalWarn = console.warn;

beforeAll(() => {
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

afterAll(() => {
  console.warn.mockRestore();
});
