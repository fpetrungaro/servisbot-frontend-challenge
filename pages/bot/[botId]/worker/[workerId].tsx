/*
This component shows logs for a specific worker, which is associated with a specific bot.
*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {AppDispatch, AppState} from '@/store';
import {fetchLogSummaries, selectLogSummaries} from '@/store/logSlice';
import LogList from '../../../../components/LogList';
import { Container, Typography } from '@mui/material';
import Breadcrumb from "@/components/Breadcrumbs";

const WorkerLogs = () => {
  const router = useRouter();
  const { botId, workerId } = router.query;
  const dispatch: AppDispatch = useDispatch();

  const logs = useSelector(selectLogSummaries);
  const loadingLogs = useSelector((state: AppState) => state.logs.loading);
  const errorLogs = useSelector((state: AppState) => state.logs.error);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `Bot ${botId}`, href: `/bot/${botId}` },
    { label: `Worker ${workerId}`, href: `/worker/${workerId}` },
  ];

  useEffect(() => {
    if (workerId && botId) {
      dispatch(fetchLogSummaries({ botId: String(botId), workerId: String(workerId) })); // Fetch logs for the specific worker and bot
    }
  }, [dispatch, workerId, botId]);

  return (
    <Container>
      <Breadcrumb items={breadcrumbItems}/>
      <Typography variant="h5" gutterBottom style={{ color: '#1976d2', marginLeft: '0.5rem' }}>
        Worker: {workerId}
      </Typography>
      {loadingLogs && <p>Loading logs...</p>}
      {errorLogs && <p style={{ color: 'red' }}>Error fetching logs: {errorLogs}</p>}
      <LogList logs={logs} from="worker"/>
    </Container>
  );
};

export default WorkerLogs;
