import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {useRouter} from 'next/router';
import BotDetail from '../../../pages/bot/[botId]';

// Create a mock store
const mockStore = configureStore();

const mockState = {
    workers: {
        loading: false,
        error: null,
        workers: [
            {id: '1', name: 'Worker One', description: 'desc 1', bot: 'Bot One', created: 1713762074684 },
            {id: '2', name: 'Worker Two', description: 'desc 2', bot: 'Bot Two',  created: 1713762074500 },
        ],
    },
    logs: {
        loading: false,
        error: null,
        logSummaries: [
            {id: 'Log One', created: '2024-10-22T14:14:14.936Z'},
            {id: 'Log Two', created: '2024-10-23T14:14:14.936Z'},
        ],
    },
    bots: {
        bots: [
            {id: '1', name: 'Bot One'},
            {id: '2', name: 'Bot Two'},
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

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: {botId: '1'},
    }),
}));

describe('BotDetail Component', () => {

    it('renders the bot name and ID', () => {
        render(
            <Provider store={mockStore(mockState)}>
                <BotDetail/>
            </Provider>
        );

        expect(screen.getByText('Bot One (1)')).toBeInTheDocument();
    });

    it('renders the WorkerList component', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: {botId: '1'},
        }));

        render(
            <Provider store={mockStore(mockState)}>
                <BotDetail/>
            </Provider>
        );

        expect(screen.getByText('Workers')).toBeInTheDocument();
        expect(screen.getByText(/Worker Name/i)).toBeInTheDocument();

    });

    it('renders the LogList component', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: {botId: '1'},
        }));

        render(
            <Provider store={mockStore(mockState)}>
                <BotDetail/>
            </Provider>
        );

        expect(screen.getByText('Logs')).toBeInTheDocument();
        expect(screen.getByText('Log One')).toBeInTheDocument();
        expect(screen.getByText('Log Two')).toBeInTheDocument();
    });
});