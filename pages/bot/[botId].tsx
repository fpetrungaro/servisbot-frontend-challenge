/*
Displays Workers and Log summaries for a Specific Bot.
This component shows both the workers associated with a specific bot and the logs related to the bot.
It reuses 2 MUI components: WorkerList and LogList
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppState } from '../../store';
import { fetchWorkersByBotName } from '@/store/workerSlice'; // Action to fetch workers
import { fetchLogSummaries, selectLogSummaries } from '@/store/logSlice'; // Action to fetch log summaries
import WorkerList from '../../components/WorkerList';
import LogList from '../../components/LogList';
import { Container, Typography } from '@mui/material';

const BotDetail = () => {
  const router = useRouter();
  const { botId } = router.query;

  const dispatch = useDispatch();

  // Fetch workers and logs from Redux store
  const workers = useSelector((state: AppState) => state.workers.workers);
  const logs = useSelector(selectLogSummaries);
  // loading
  const loadingLogs = useSelector((state: AppState) => state.logs.loading);
  const loadingWorkers = useSelector((state: AppState) => state.workers.loading);
  // errors
  const errorLogs = useSelector((state: AppState) => state.logs.error);
  const errorWorkers = useSelector((state: AppState) => state.workers.error);

  const bots = useSelector((state: AppState) => state.bots.bots);
  const bot = bots.find(b => b.id === botId) || { name: '' }; // Find the bot by ID

  useEffect(() => {
    if (bot.name) {
      dispatch(fetchWorkersByBotName(bot.name)); // Fetch workers for the specific bot by name
    }
    if (bot.id) {
        dispatch(fetchLogSummaries({ botId: bot.id })); // Fetch log summaries for the specific bot by ID
    }
  }, [dispatch, bot.name, bot.id]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ color: '#1976d2', marginLeft: '0.5rem' }}>
        Bot: {bot.name} ({bot.id})
      </Typography>
      {loadingWorkers && <p>Loading workers...</p>}
      {errorWorkers && <p>Error fetching workers: {errorWorkers}</p>}
      <WorkerList botId={String(botId)} workers={workers} />
      {loadingLogs && <p>Loading logs...</p>}
      {errorLogs && <p>Error fetching logs: {errorLogs}</p>}
      <LogList logs={logs} />
    </Container>
  );
};

export default BotDetail;

