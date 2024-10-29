//Bot list component

import Link from 'next/link';
import {List, ListItem, ListItemText} from '@mui/material';
import {Bot} from '@/types/dataModels';
import React from "react";

interface BotListProps {
    bots: Bot[];
}

const options = {
  hour12: false,
  fractionalSecondDigits: 3
};

const BotList: React.FC<BotListProps> = ({bots}) => {
    return (
        <List>
            {bots.map(bot => (
                <ListItem key={bot.id} component={Link} href={`/bot/${bot.id}`}>
                    <ListItemText primary={bot.name}
                                  secondary={
                                      <React.Fragment>
                                          <span>{bot.description}</span>
                                          <br/>
                                          <span>Created on: {new Date(bot.created).toISOString()}</span>
                                      </React.Fragment>
                                  }/>
                </ListItem>
            ))}
        </List>
    );
};

export default BotList;
