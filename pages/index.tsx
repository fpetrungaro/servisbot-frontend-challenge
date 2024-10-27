
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { fetchBots } from '../store/botSlice';
import BotList from '../components/BotList';
import { Container, Typography } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const bots = useSelector((state: AppState) => state.bots.bots);
  const loadingBots = useSelector((state: AppState) => state.bots.loading);
  const errorBots = useSelector((state: AppState) => state.bots.error);

  useEffect(() => {
    dispatch(fetchBots()); // Fetch bots when the component mounts
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bot List
      </Typography>
      {loadingBots && <p>Loading bots...</p>}
      {errorBots && <p>Error fetching bots: {errorBots}</p>}
      <BotList bots={bots} />
    </Container>
  );
};

export default Home;
