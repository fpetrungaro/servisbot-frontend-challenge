import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import WorkerList from '../../components/WorkerList'; // Adjust import according to your structure
import { Worker } from '@/types/dataModels';


describe('WorkerList Component', () => {
  const workers: Worker[] = [
    { id: '1', name: 'Worker One', description: 'description 1', bot: 'bot 1', created: 1713762074684 },
    { id: '2', name: 'Worker Two', description: 'description 2', bot: 'bot 1', created: 1713762074800 },
    { id: '3', name: 'Worker Three', description: 'description 3', bot: 'bot 2', created: 1713762074900 },
  ];

  it('renders the correct number of workers', async () => {
    render(<WorkerList botId={'1'} workers={workers} />);

    // Get the grid element
    const grid = screen.getByRole('grid');

    // Access the aria-rowcount attribute
    const rowCount = grid.getAttribute('aria-rowcount');

    // Since we are expecting the header row + the worker rows
    expect(rowCount).toBe((workers.length + 1).toString()); // +1 for header row
  });

  it('renders no workers found message when worker list is empty', async () => {
    render(<WorkerList botId={'1'} workers={[]}/>);

    const messageElement = screen.getByText('No Workers found');
    expect(messageElement).toBeInTheDocument();
  });

  it('renders worker list correctly', () => {
    const {asFragment} = render(<WorkerList botId={'1'} workers={workers} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
