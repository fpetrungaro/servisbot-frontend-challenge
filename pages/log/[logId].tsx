import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppState } from '@/store';
import { fetchLogById, selectLog } from '../../store/logSlice';
import { Container, Typography } from '@mui/material';

const LogDetail = () => {
  const router = useRouter();
  const { logId } = router.query;

  const dispatch = useDispatch();
  const log = useSelector(selectLog);

  useEffect(() => {
    if (logId) {
      dispatch(fetchLogById(logId as string));
    }
  }, [dispatch, logId]);

  if (!log) return <p>Loading log details...</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Log Details</Typography>
      <Typography variant="body1"><strong>ID:</strong> {log.id}</Typography>
      <Typography variant="body1"><strong>Created:</strong> {log.created}</Typography>
      <Typography variant="body1"><strong>Message:</strong> {log.message}</Typography>
      <Typography variant="body1"><strong>Bot:</strong> {log.bot}</Typography>
      <Typography variant="body1"><strong>Worker:</strong> {log.worker}</Typography>
    </Container>
  );
};

export default LogDetail;

