//WorkerList component
import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';
import { Worker } from '@/types/dataModels';
import React from "react";

interface WorkerListProps {
  botId: string
  workers: Worker[];
}

const WorkerList: React.FC<WorkerListProps> = ({botId, workers}) => {
  return (
      <List>
        {workers.map(worker => (
            <ListItem key={worker.id} component={Link} href={`/bot/${botId}/worker/${worker.id}`}>
              <ListItemText primary={worker.name}
                            secondary={
                              <React.Fragment>
                                <span>{worker.description}</span>
                                <br/>
                                <span>Created on: {new Date(worker.created).toISOString()}</span>
                              </React.Fragment>
                            }/>
            </ListItem>
        ))}
      </List>
  );
};

export default WorkerList;

