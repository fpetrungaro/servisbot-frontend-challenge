/*
This component shows logs for a specific worker, which is associated with a specific bot.
*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppState } from '@/store';
import { fetchLogs } from '@/store/logSlice';
import LogList from '../../../../components/LogList';
import { Container, Typography } from '@mui/material';

const WorkerLogs = () => {
  const router = useRouter();
  const { botId, workerId } = router.query;
  const dispatch = useDispatch();

  const logs = useSelector((state: AppState) => state.logs.logs);
  const loadingLogs = useSelector((state: AppState) => state.logs.loading);
  const errorLogs = useSelector((state: AppState) => state.logs.error);

  useEffect(() => {
    if (workerId && botId) {
      dispatch(fetchLogs({ workerId: String(workerId), botId: String(botId) })); // Fetch logs for the specific worker and bot
    }
  }, [dispatch, workerId, botId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Logs for Worker: {workerId} (Bot: {botId})
      </Typography>
      <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>
        {logs.length} logs found
      </Typography>
      {loadingLogs && <p>Loading logs...</p>}
      {errorLogs && <p>Error fetching logs: {errorLogs}</p>}
      <LogList logs={logs} />
    </Container>
  );
};

export default WorkerLogs;
