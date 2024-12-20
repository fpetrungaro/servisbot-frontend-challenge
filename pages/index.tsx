import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, AppState} from '../store';
import { fetchBots, selectBots } from '../store/botSlice';
import BotList from '../components/BotList';
import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const bots = useSelector(selectBots);
  const loadingBots = useSelector((state: AppState) => state.bots.loading);
  const errorBots = useSelector((state: AppState) => state.bots.error);

  useEffect(() => {
    dispatch(fetchBots()); // Fetch bots when the component mounts
  }, [dispatch]);

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Image src="/images/servisbot.jpeg" alt="Logo" width={50} height={50} />
        <Typography variant="h4" style={{ color: '#1976d2', marginLeft: '0.5rem' }}>
          Welcome to the ServisBOT App
        </Typography>
      </div>

      {/* Swagger UI Link */}
      <Typography variant="body1" gutterBottom>
        Visit the{' '}
        <Link href="/swagger" target="_blank" passHref>
          <Button variant="contained" color="primary">
            Swagger API Documentation
          </Button>
        </Link>
      </Typography>

      {loadingBots && <p>Loading bots...</p>}
      {errorBots && <p>Error fetching bots: {errorBots}</p>}
      <BotList bots={bots} />
    </Container>
  );
};

export default Home;