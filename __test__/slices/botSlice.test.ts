import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { botReducer, fetchBots, selectBots } from '@/store/botSlice';

describe('Bot Slice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        bots: botReducer,
      },
    });
  });

  it('should fetch bots successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: '1', name: 'Bot One' }]),
    });

    // Dispatch the fetchBots async thunk
    await store.dispatch(fetchBots());

    // Get the state after dispatching the action
    const state = store.getState();

    // Check if the bots are populated in the state
    expect(selectBots(state)).toEqual([{ id: '1', name: 'Bot One' }]);
    expect(state.bots.loading).toBe(false);
    expect(state.bots.error).toBe(null);
  });

  it('should handle failed bot fetch', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Failed to fetch bots' }),
    });

    // Dispatch the fetchBots async thunk
    await store.dispatch(fetchBots());

    // Get the state after dispatching the action
    const state = store.getState();

    // Check if the error is set in the state
    expect(selectBots(state)).toEqual([]);
    expect(state.bots.loading).toBe(false);
    expect(state.bots.error).toBe('Failed to fetch bots');
  });
});
