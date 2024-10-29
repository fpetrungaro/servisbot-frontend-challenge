// LogList component
import { List, ListItem, ListItemText } from '@mui/material';
import {LogSummary} from '../types/dataModels';
import Link from "next/link";

interface LogListProps {
  logs: LogSummary[];
}

const LogList: React.FC<LogListProps> = ({ logs }) => {
  return (
    <List>
      {logs.map(log => (
        <ListItem key={log.id} component={Link} href={`/log/${log.id}`}>
          <ListItemText primary={`Log ID: ${log.id}`}
                        secondary={`Created on ${new Date(log.created).toISOString()}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default LogList;
