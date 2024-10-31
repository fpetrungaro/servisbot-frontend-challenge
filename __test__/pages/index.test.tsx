import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../../pages/index';

// Create a mock store
const mockStore = configureStore();

const mockState = {
  bots: {
    loading: false,
    error: null,
    bots: [
      { id: '1', name: 'Bot One', description: 'First Bot', status: 'ENABLED', created: 1713762074684 },
      { id: '2', name: 'Bot Two', description: 'Second Bot', status: 'DISABLED', created: 1713762074500 },
    ],
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation((selectorFn) => {
    // Call the selector function with the mock state
    return selectorFn(mockState);
  }),
  useDispatch: () => jest.fn(),
  Provider: ({ children }) => children,
}));
describe('Home Component', () => {

  it('renders the welcome message', () => {
    render(
      <Provider store={mockStore()}>
        <Home />
      </Provider>
    );
    expect(screen.getByText(/Bot Name/i)).toBeInTheDocument();
    expect(screen.getByText('Welcome to the ServisBOT App')).toBeInTheDocument();
  });

  it('renders the Swagger API link', () => {
    render(
      <Provider store={mockStore()}>
        <Home />
      </Provider>
    );

    const swaggerLink = screen.getByText('Swagger API Documentation');
    expect(swaggerLink).toBeInTheDocument();
  });

  it('renders BotList component with bots', () => {
    render(
      <Provider store={mockStore(mockState)}>
        <Home />
      </Provider>
    );

    // Check if BotList is rendered with correct number of bots
    expect(screen.getByText(/Bot Name/i)).toBeInTheDocument();
  });
});

