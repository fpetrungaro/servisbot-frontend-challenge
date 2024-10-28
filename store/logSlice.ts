// Log slice for Log State management

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { Log } from '@/types/dataModels';


interface LogState {
  logs: Log[];
  loading: boolean;
  error: string | null;
}

const initialState: LogState = {
  logs: [],
  loading: false,
  error: null,
};

// Fetch logs for a specific worker under a specific bot
export const fetchLogsForWorker = createAsyncThunk(
  'logs/fetchLogsForWorker',
  async ({ botId, workerId }: { botId: string; workerId: string }) => {
    const response = await fetch(`/api/logs/bot/${botId}/worker/${workerId}`);
    const logs: Log[] = await response.json();
    return logs;
  }
);


export const fetchLogs = createAsyncThunk(
  'logs/fetchLogs',
  async ({ botId, workerId }: { botId?: string; workerId?: string }) => {
    let url = '/api/logs';
    const params = new URLSearchParams();
    if (botId) params.append('botId', botId);
    if (workerId) params.append('workerId', workerId);
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
        if (!response.ok) {
      throw new Error('Failed to fetch logs');
    }
    return response.json();
  }
);


const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action: PayloadAction<Log[]>) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load logs';
      });
  },
});


// Export the reducer
export const logReducer = logSlice.reducer;



