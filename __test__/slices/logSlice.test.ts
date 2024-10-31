import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logReducer, fetchLogSummaries, fetchLogById, selectLogSummaries, selectLog } from '@/store/logSlice';

describe('Log Slice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        logs: logReducer,
      },
    });
  });

  it('should fetch log summaries successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: '1', message: 'Log One' }]),
    });

    // Dispatch the fetchLogSummaries async thunk
    await store.dispatch(fetchLogSummaries({ botId: '1' }));

    // Get the state after dispatching the action
    const state = store.getState();

    // Check if the log summaries are populated in the state
    expect(selectLogSummaries(state)).toEqual([{ id: '1', message: 'Log One' }]);
    expect(state.logs.loading).toBe(false);
    expect(state.logs.error).toBe(null);
  });

  it('should handle failed log summaries fetch', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Failed to fetch log summaries' }),
    });

    // Dispatch the fetchLogSummaries async thunk
    await store.dispatch(fetchLogSummaries({ botId: '1' }));

    // Get the state after dispatching the action
    const state = store.getState();

    // Check if the error is set in the state
    expect(selectLogSummaries(state)).toEqual([]);
    expect(state.logs.loading).toBe(false);
    expect(state.logs.error).toBe('Failed to fetch logs');
  });

  it('should fetch a single log successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '1', message: 'Log One' }),
    });

    // Dispatch the fetchLogById async thunk
    await store.dispatch(fetchLogById('1'));

    // Get the state after dispatching the action
    const state = store.getState();

    // Check if the log is populated in the state
    expect(selectLog(state)).toEqual({ id: '1', message: 'Log One' });
    expect(state.logs.loading).toBe(false);
    expect(state.logs.error).toBe(null);
  });

  it('should handle failed single log fetch', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Failed to fetch single log' }),
    });

    // Dispatch the fetchLogById async thunk
    await store.dispatch(fetchLogById('1'));

    // Get the state after dispatching the action
    const state = store.getState();

    // Check if the error is set in the state
    expect(selectLog(state)).toBe(null);
    expect(state.logs.loading).toBe(false);
    expect(state.logs.error).toBe('Failed to fetch single log');
  });
});
