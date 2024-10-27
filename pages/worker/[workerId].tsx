/*
This component shows logs for a specific worker, which is associated with a specific bot.
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppState } from '../../store';
import { fetchLogsByWorker } from '../../store/logSlice';
import LogList from '../../components/LogList';
import { Container, Typography } from '@mui/material';

const WorkerLogs = () => {
  const router = useRouter();
  const { workerId } = router.query;
  const dispatch = useDispatch();

  const logs = useSelector((state: AppState) => state.logs.logs);
  const loadingLogs = useSelector((state: AppState) => state.logs.loading);
  const errorLogs = useSelector((state: AppState) => state.logs.error);

  // Assuming the worker ID is used to fetch the corresponding bot ID somehow
  const botId = router.query.botId as string; // You might want to pass the botId as well if necessary

  useEffect(() => {
    if (workerId && botId) {
      dispatch(fetchLogsByWorker({ workerId: workerId as string, botId })); // Fetch logs for the specific worker
    }
  }, [dispatch, workerId, botId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Logs for Worker: {workerId}
      </Typography>
      {loadingLogs && <p>Loading logs...</p>}
      {errorLogs && <p>Error fetching logs: {errorLogs}</p>}
      <LogList logs={logs} />
    </Container>
  );
};

export default WorkerLogs;

