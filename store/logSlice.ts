// Log slice for Log State management

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Log, LogSummary} from '@/types/dataModels';
import {AppState} from "@/store/index";


interface LogState {
  logSummaries: LogSummary[];
  log: Log | null;
  loading: boolean;
  error: string | null;
}


const initialState: LogState = {
  logSummaries: [],
  log: null,
  loading: false,
  error: null,
};



// Fetch log summaries for a specific bot/ a specific worker under a specific bot
export const fetchLogSummaries = createAsyncThunk(
  'logs/fetchLogSummaries',
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
    return await response.json();
  }
);

// Fetch full log
export const fetchLogById = createAsyncThunk(
  'logs/fetchLogById',
  async (logId: string) => {
    const response = await fetch(`/api/logs/${logId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch single log');
    }
    return await response.json();
  }
);



const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogSummaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogSummaries.fulfilled, (state, action: PayloadAction<LogSummary[]>) => {
        state.loading = false;
        state.logSummaries = action.payload;
      })
      .addCase(fetchLogSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load log summaries';
        state.logSummaries = []
      })
      .addCase(fetchLogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogById.fulfilled, (state, action: PayloadAction<Log>) => {
        state.loading = false;
        state.log = action.payload;
      })
      .addCase(fetchLogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load log';
        state.logSummaries = []
      });
  },
});

export const selectLogSummaries = (state: AppState) => state.logs.logSummaries;
export const selectLog = (state: AppState) => state.logs.log;


// Export the reducer
export const logReducer = logSlice.reducer;
