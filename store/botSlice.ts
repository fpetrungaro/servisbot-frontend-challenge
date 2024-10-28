// Bot slice for Bot State management
import { createSlice, createAsyncThunk } from  '@reduxjs/toolkit';
import { Bot } from '@/types/dataModels';

interface BotState {
  bots: Bot[];
  loading: boolean;
  error: string | null;
}

const initialState: BotState = {
  bots: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all bots
export const fetchBots = createAsyncThunk<Bot[]>(
  'bots/fetchBots',
  async () => {
      const response = await fetch('api/bots');
      //const bots: Bot[] = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch bots');
    }
    return await response.json(); // Assuming the API returns bots in the expected format
  }
);

const botSlice = createSlice({
  name: 'bots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBots.fulfilled, (state, action) => {
        state.loading = false;
        state.bots = action.payload; // Populate bots with fetched data
      })
      .addCase(fetchBots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bots';
      });
  },
});

// Export the reducer
export const botReducer = botSlice.reducer;
