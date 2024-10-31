/*
Displays Workers and Log summaries for a Specific Bot.
This component shows both the workers associated with a specific bot and the logs related to the bot.
It reuses 2 MUI components: WorkerList and LogList
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppState, AppDispatch } from '@/store';
import { fetchWorkersByBotName } from '@/store/workerSlice'; // Action to fetch workers
import { fetchLogSummaries, selectLogSummaries } from '@/store/logSlice'; // Action to fetch log summaries
import WorkerList from '../../components/WorkerList';
import LogList from '../../components/LogList';
import {Accordion, AccordionDetails, AccordionSummary, Container, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Breadcrumb from "@/components/Breadcrumbs";

const BotDetail = () => {
  const router = useRouter();
  const {botId} = router.query as { botId: string };

  const dispatch: AppDispatch = useDispatch();

  // Fetch workers and logs from Redux store
  const workers = useSelector((state: AppState) => state.workers.workers);
  const logs = useSelector(selectLogSummaries);
  // loading
  const loadingLogs = useSelector((state: AppState) => state.logs.loading);
  const loadingWorkers = useSelector((state: AppState) => state.workers.loading);
  // errors
  const errorLogs = useSelector((state: AppState) => state.logs.error);
  const errorWorkers = useSelector((state: AppState) => state.workers.error);

  // fetch bot name from the store
  // TODO; this could be improved by storing the current bot in the state
  const bots = useSelector((state: AppState) => state.bots.bots);
  const currentBot  = bots.find(b => b.id === botId) || {name: ''}// Find the bot by ID
  const botName = currentBot.name

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `Bot ${botId}`, href: `/bot/${botId}` },
  ];

  useEffect(() => {
    if (botName) {
      dispatch(fetchWorkersByBotName(botName)); // Fetch workers for the specific bot by name
    }
    if (botId) {
        dispatch(fetchLogSummaries({ botId: botId })); // Fetch log summaries for the specific bot by ID
    }
  }, [dispatch, botName, botId]);

  return (
        <Container>
          <Breadcrumb items={breadcrumbItems}/>
          <Typography variant="h5" gutterBottom style={{color: '#1976d2', marginLeft: '0.5rem'}}>
            {botName} ({botId})
          </Typography>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography variant="h6">Workers</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loadingWorkers && <p>Loading workers...</p>}
              {errorWorkers && <p style={{ color: 'red' }}>Error fetching workers: {errorWorkers}</p>}
              <WorkerList botId={String(botId)} workers={workers}/>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography variant="h6">Logs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loadingLogs && <p>Loading logs...</p>}
              {errorLogs && <p style={{color: 'red'}}>Error fetching logs: {errorLogs}</p>}
                <LogList logs={logs}  from="bot"/>
            </AccordionDetails>
          </Accordion>
        </Container>
  );
};

export default BotDetail;
