// LogList component
import { List, ListItem, ListItemText } from '@mui/material';
import { Log } from '../types/dataModels';

interface LogListProps {
  logs: Log[];
}

const LogList: React.FC<LogListProps> = ({ logs }) => {
  return (
    <List>
      {logs.map(log => (
        <ListItem key={log.id}>
          <ListItemText primary={log.message} secondary={`Created on ${new Date(log.created).toLocaleString()}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default LogList;
