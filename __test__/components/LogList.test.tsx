import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LogList from '../../components/LogList'; // Adjust import according to your structure
import { Log } from '@/types/dataModels';
import WorkerList from "@/components/WorkerList";

describe('LogList Component', () => {
  const logs: Log[] = [
    { id: '1', message: 'Log Entry One', bot: 'bot 1', worker: 'worker 1', created: '2023-04-22T17:15:14.941Z' },
    { id: '2', message: 'Log Entry Two', bot: 'bot 2', worker: 'worker 2', created: '2023-04-22T17:15:14.941Z'},
  ];

  it('renders the correct number of logs', async () => {
    render(<LogList from='bot' logs={logs} />);

    // Get the grid element
    const grid = await screen.findByRole('grid');

    // Access the aria-rowcount attribute
    const rowCount = grid.getAttribute('aria-rowcount');

    // Since we are expecting the header row + the log entries
    expect(rowCount).toBe((logs.length + 1).toString()); // +1 for header row
  });

  it('renders no logs found message when log list is empty', async () => {
    render(<LogList from='worker' logs={[]}/>);

    const messageElement = screen.getByText('No Logs found');
    expect(messageElement).toBeInTheDocument();
  });

  it('renders log list correctly', () => {
    const {asFragment} = render(<LogList from='bot' logs={logs} />);
    expect(asFragment()).toMatchSnapshot();
  });

});

