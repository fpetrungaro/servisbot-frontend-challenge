import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchLogById, selectLog } from '@/store/logSlice';
import {Container, Typography, Paper, Grid, TextareaAutosize} from '@mui/material';
import Breadcrumb from "@/components/Breadcrumbs";
import {AppDispatch} from "@/store";

const LogDetail = () => {
  const router = useRouter();
  const { from,  logId } = router.query as { from: string, logId: string };

  const dispatch: AppDispatch = useDispatch();
  const log = useSelector(selectLog);

  useEffect(() => {
    if (logId) {
      dispatch(fetchLogById(logId as string));
    }
  }, [dispatch, logId]);

  if (!log) return <p>Loading log details...</p>;
  let breadcrumbItems = []
  if (from == 'worker') {
    breadcrumbItems = [
      {label: 'Home', href: '/'},
      {label: `Bot ${log.bot}`, href: `/bot/${log.bot}`},
      {label: `Worker ${log.worker}`, href: `/bot/${log.bot}/worker/${log.worker}`},
      {label: `Log ${logId}`, href: `/log/${logId}`},
    ];
  } else {
    breadcrumbItems = [
      {label: 'Home', href: '/'},
      {label: `Bot ${log.bot}`, href: `/bot/${log.bot}`},
      {label: `Log ${logId}`, href: `/log/${logId}`},
    ];
  }

  return (
    <Container>
      <Breadcrumb items={breadcrumbItems}/>
      <Typography variant="h5" gutterBottom style={{ color: '#1976d2', marginLeft: '0.5rem' }}>
        Log: {logId}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="body1" component="div">
              <strong>ID:</strong> {log.id}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="body1" component="div">
              <strong>Created:</strong> {log.created}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="body1" component="div">
              <strong>Bot:</strong> {log.bot}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="body1" component="div">
              <strong>Worker:</strong> {log.worker}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="body1" component="div">
              <strong>Message:</strong>
              <TextareaAutosize
              value={log.message}
              readOnly
              style={{ width: '100%', resize: 'none', border: 'none', background: 'transparent', overflow: 'auto' }}
            />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogDetail;