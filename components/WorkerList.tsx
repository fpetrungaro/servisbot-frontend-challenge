//WorkerList component
import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';
import { Worker } from '@/types/dataModels';

interface WorkerListProps {
  botId: string
  workers: Worker[];
}

const WorkerList: React.FC<WorkerListProps> = ({ botId, workers }) => {
  return (
    <List>
      {workers.map(worker => (
        <ListItem button key={worker.id} component={Link} href={`/bot/${botId}/worker/${worker.id}`}>
          <ListItemText primary={worker.name} secondary={worker.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default WorkerList;

