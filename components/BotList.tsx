//Bot list component

import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';
import { Bot } from '@/types/dataModels';

interface BotListProps {
  bots: Bot[];
}

const BotList: React.FC<BotListProps> = ({ bots }) => {
  return (
    <List>
      {bots.map(bot => (
        <ListItem button key={bot.id} component={Link} href={`/bot/${bot.id}`}>
          <ListItemText primary={bot.name} secondary={bot.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default BotList;
