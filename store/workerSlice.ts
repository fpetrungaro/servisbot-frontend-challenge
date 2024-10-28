// worker slice for worker State management
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Worker } from '@/types/dataModels';


// Define initial state
const initialState = {
  workers: [] as Worker[],
  loading: false,
  error: null as string | null,
};

// Fetch workers by bot name
export const fetchWorkersByBotName = createAsyncThunk(
  'workers/fetchByBotName',
  async (botName: string) => {
    //const response = await fetch(`${WORKERS_URL}?name=${encodeURIComponent(botName)}`);
      const response = await fetch(`/api/workers/bot/${botName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch workers');
    }
    return await response.json();
  }
);

const workerSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkersByBotName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkersByBotName.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.workers = action.payload; // The API returns an array of workers
      })
      .addCase(fetchWorkersByBotName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch workers';
      });
  },
});

export const workerReducer = workerSlice.reducer;




