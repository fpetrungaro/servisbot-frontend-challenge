import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import WorkerLogs from '../../../../../pages/bot/[botId]/worker/[workerId]';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('WorkerLogs Component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((selector) => selector({
      logs: {
        loading: false,
        error: null,
        logSummaries: [
            {id: 'Log One', created: '2024-10-22T14:14:14.936Z'},
            {id: 'Log Two', created: '2024-10-23T14:14:14.936Z'},
        ],
      },
    }));
    useRouter.mockReturnValue({
      query: { botId: '1', workerId: '1' },
    });
  });

  it('renders WorkerLogs component', () => {
    render(<WorkerLogs />);

    expect(screen.getByText('Worker: 1')).toBeInTheDocument();
  });

  it('renders error message when logs fetch fails', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        logs: {
          loading: false,
          error: 'Error fetching logs',
          logSummaries: [],
        },
      })
    );

    render(<WorkerLogs />);

    expect(screen.getByText('Error fetching logs: Error fetching logs')).toBeInTheDocument();
  });

  it('renders log list when logs are available', () => {
    render(<WorkerLogs />);

    expect(screen.queryByText('Log One')).toBeInTheDocument();
    expect(screen.queryByText('Loading logs...')).toBeNull();
    expect(screen.queryByText('Error fetching logs: Error fetching logs')).toBeNull();
  });
});