import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BotList from '../../components/BotList'; // Adjust the import according to your directory structure
import { Bot } from '@/types/dataModels';


describe('BotList Component', () => {

  const bots: Bot[] = [
    { id: '1', name: 'Bot One', description: 'First Bot', status: 'ENABLED', created: 1713762074684 },
    { id: '2', name: 'Bot Two', description: 'Second Bot', status: 'DISABLED', created: 1713762074500 },
  ];


  it('renders Bot List heading', () => {
    render(<BotList bots={bots} />);
    expect(screen.getByRole('heading', { name: /Bot List/i })).toBeInTheDocument();
  });

  it('renders the correct number of bots', () => {
    render(<BotList bots={bots} />);

    const grid = screen.getByRole('grid');
    const rowCount = grid.getAttribute('aria-rowcount');

    expect(rowCount).toBe((bots.length + 1).toString()); // +1 for header row
  });

  it('renders bot list correctly', () => {
    const {asFragment} = render(<BotList bots={bots}/>);
    expect(asFragment()).toMatchSnapshot();
  });


});
