/*
Displays Workers and Logs for a Specific Bot.
This component shows both the workers associated with a specific bot and the logs related to the bot.
It reuses 2 components: WorkerList and LogList
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppState } from '../../store';
import { fetchWorkersByBotName } from '../../store/workerSlice'; // Action to fetch workers
import { fetchLogsByBot } from '../../store/logSlice'; // Action to fetch logs
import WorkerList from '../../components/WorkerList';
import LogList from '../../components/LogList';
import { Container, Typography } from '@mui/material';

const BotDetail = () => {
  const router = useRouter();
  const { botId } = router.query;

  const dispatch = useDispatch();

  // Fetch workers and logs from Redux store
  const workers = useSelector((state: AppState) => state.workers.workers);
  const logs = useSelector((state: AppState) => state.logs.logs);
  const loadingWorkers = useSelector((state: AppState) => state.workers.loading);
  const loadingLogs = useSelector((state: AppState) => state.logs.loading);
  const errorWorkers = useSelector((state: AppState) => state.workers.error);
  const errorLogs = useSelector((state: AppState) => state.logs.error);

  // Get the bot name based on the botId
  const bots = useSelector((state: AppState) => state.bots.bots);
  const bot = bots.find(b => b.id === botId) || { name: '' }; // Find the bot by ID

  useEffect(() => {
    if (bot.name) {
      dispatch(fetchWorkersByBotName(bot.name)); // Fetch workers for the specific bot by name
      dispatch(fetchLogsByBot(bot.id)); // Fetch logs for the specific bot by ID
    }
  }, [dispatch, bot.name, bot.id]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Workers for Bot: {bot.name}
      </Typography>
      {loadingWorkers && <p>Loading workers...</p>}
      {errorWorkers && <p>Error fetching workers: {errorWorkers}</p>}
      <WorkerList workers={workers} />

      <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
        Logs for Bot: {bot.name}
      </Typography>
      {loadingLogs && <p>Loading logs...</p>}
      {errorLogs && <p>Error fetching logs: {errorLogs}</p>}
      <LogList logs={logs} />
    </Container>
  );
};

export default BotDetail;

