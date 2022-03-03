import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));
