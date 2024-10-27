// Log slice for Log State management

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Log } from '../types/dataModels';
import {LOGS_URL} from "@/constants"; // Adjust the path based on your structure

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

// Async thunk to fetch logs by botId
export const fetchLogsByBot = createAsyncThunk<Log[], string>(
  'logs/fetchLogsByBot',
  async (botId) => {
    const response = await fetch(`../data/logs.json?botId=${botId}`); // This could be a URL
    if (!response.ok) {
      throw new Error('Failed to fetch logs');
    }
    return response.json();
  }
);

// Async thunk to fetch logs by workerId
export const fetchLogsByWorker = createAsyncThunk<Log[], { workerId: string; botId: string }>(
  'logs/fetchLogsByWorker',
  async ({ workerId, botId }) => {
    const response = await fetch(`${LOGS_URL}?workerId=${workerId}&botId=${botId}`); // Adjust path accordingly
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
      .addCase(fetchLogsByBot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogsByBot.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload; // Populate logs with fetched data
      })
      .addCase(fetchLogsByBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch logs';
      })
      .addCase(fetchLogsByWorker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogsByWorker.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload; // Populate logs with fetched data
      })
      .addCase(fetchLogsByWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch logs';
      });
  },
});

// Export the reducer
export const logReducer = logSlice.reducer;



